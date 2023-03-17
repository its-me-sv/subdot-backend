const router = require("express").Router();
const {types} = require("cassandra-driver");
const cqlClient = require("../utils/astra");

// add new advertisement
router.post("/new", async (req, res) => {
    try {
        const { accountId, picture, link, expires } = req.body;
        const QUERY = `
            INSERT INTO advertisements 
            (created_at, account_id, picture, link, expires) 
            VALUES (?, ?, ?, ?, ?) USING TTL ?;
        `;
        const adId = types.TimeUuid.now().toString();
        const expSec = Math.floor((new Date(expires).getTime() - Date.now()) / 1000);
        const VALUE = [
            adId, 
            accountId, 
            picture, 
            link, 
            expires, 
            expSec
        ];
        await cqlClient.execute(QUERY, VALUE, {prepare: true});
        const resBody = {
            accountId,
            picture,
            link,
            expires,
            _id: adId,
            __v: 0
        };
        return res.status(200).json(resBody);
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// fetch advertisement
router.get("/", async (req, res) => {
    try {
        const QUERY = `SELECT * FROM advertisements LIMIT 1;`;
        const data = await cqlClient.execute(QUERY);
        const advert = data.rows[0];
        if (!data.rowLength || !advert) 
            return res.status(200).json(null);
        const resBody = {
            accountId: advert.account_id,
            picture: advert.picture,
            link: advert.link,
            expires: advert.expires,
            _id: advert.created_at,
            __v: 0
        };
        return res.status(200).json(resBody);
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

module.exports = router;
