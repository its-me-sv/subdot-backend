const router = require("express").Router();
const {types} = require("cassandra-driver");
const cqlClient = require("../utils/astra");
const Advert = require("../models/advert");

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
        const docs = await Advert.find({})
        .sort({expires: "descending"})
        .limit(1);
        return res.status(200).json(docs[0] || null);
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

module.exports = router;
