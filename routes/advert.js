const router = require("express").Router();
const Advert = require("../models/advert");

// add new advertisement
router.post("/new", async (req, res) => {
    try {
        const {expires, ...rest} = req.body;
        const newAdvert = new Advert({
            ...rest,
            expires
        });
        const doc = await newAdvert.save();
        return res.status(200).json(doc);
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// fetch advertisement
router.get("/", async (req, res) => {
    try {
        const docs = await Advert.find({});
        return res.status(200).json(docs);
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

module.exports = router;
