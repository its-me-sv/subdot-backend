const router = require("express").Router();
const {types} = require("cassandra-driver");
const cqlClient = require("../utils/astra");

// add new advertisement
router.post("/new", async (req, res) => {
    try {
        const { accountId, picture, link, expires, startedAt } = req.body;
        // inserting into advertisements table
        let QUERY = `
            INSERT INTO advertisements 
            (created_at, account_id, picture, link, expires) 
            VALUES (?, ?, ?, ?, ?) USING TTL ?;
        `;
        const adId = types.TimeUuid.fromDate(new Date(new Date(startedAt).getTime() + 1000)).toString();
        const expSec = Math.floor((new Date(expires).getTime() - Date.now()) / 1000);
        let VALUE = [
            adId, 
            accountId, 
            picture, 
            link, 
            expires, 
            expSec
        ];
        await cqlClient.execute(QUERY, VALUE, {prepare: true});
        const resBody = {
            created_at: adId,
            account_id: accountId,
            picture,
            link,
            expires
        };
        // inserting into user_adverts table
        QUERY = `
            INSERT INTO user_adverts (account_id, advert_id)
            VALUES (?, ?);
        `;
        VALUE = [accountId, adId];
        await cqlClient.execute(QUERY, VALUE, { prepare: true });
        return res.status(200).json(resBody);
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// get last advertisement date
router.get("/last", async (req, res) => {
    try {
        const query = `
            SELECT expires
            FROM advertisements;
        `;
        const data = await cqlClient.execute(query);
        return res.status(200).json(data.rows.slice(-1)[0] || "");
    } catch (err) {
        console.log(err);
        return res.status(500).json(JSON.stringify(err));
    }
});

// fetch advert of user
router.get("/user/:user_id", async (req, res) => {
    try {
        let {user_id} = req.params;
        const QUERY = `
            SELECT advert_id 
            FROM user_adverts
            WHERE account_id = ?;
        `;
        const PARAM = [user_id];
        const data = await cqlClient.execute(QUERY, PARAM, {prepare: true});
        return res.status(200).json({
            advert_id: data?.rows[0]?.advert_id || ""
        });
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// fetch advert detail
router.get("/detail/:advert_id", async (req, res) => {
    try {
        const {advert_id} = req.params;
        const QUERY = `
            SELECT picture, link
            FROM advertisements
            WHERE created_at = ?;
        `;
        const PARAM = [advert_id];
        const data = (await cqlClient.execute(QUERY, PARAM, {prepare: true})).rows[0];
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// fetch advert stats by advert id
router.get("/stat/:advert_id", async (req, res) => {
    try {
        const {advert_id} = req.params;
        let responseBody = {
            posted: new Date().toISOString(),
            expires: new Date().toISOString(),
            investment: 1,
            views: 0,
            engagement: 0
        };
        let query = `
            SELECT totimestamp(created_at) as posted,
            totimestamp(expires) as expires
            FROM advertisements
            WHERE created_at = ?;
        `;
        let value = [advert_id];
        let data = (await cqlClient.execute(query, value, {prepare: true})).rows[0];
        responseBody.posted = data.posted;
        responseBody.expires = data.expires;
        query = `
            SELECT reach as views, clicks as engagement
            FROM advertisements_reach
            WHERE created_at = ?;
        `;
        value = [advert_id];
        data = (await cqlClient.execute(query, value, { prepare: true })).rows[0];
        responseBody.views = data.views;
        responseBody.engagement = data.engagement;
        return res.status(200).json(responseBody);
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

module.exports = router;
