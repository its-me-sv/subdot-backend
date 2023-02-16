const router = require("express").Router();
const Advert = require("../models/advert");

// add new advertisement
router.post("/new", async (req, res) => {
    return res.status(200).json("New advertisement route");
});

// fetch advertisement
router.get("/", async (req, res) => {
    return res.status(200).json("Advertisement is here");
});

module.exports = router;
