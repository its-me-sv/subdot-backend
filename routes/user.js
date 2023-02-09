const router = require("express").Router();
const User = require("../models/user");

// check username presence
router.get("/username/:username", async (req, res) => {
    const {username} = req.params;
    try {
        const doc = await User.findOne({username});
        if (!doc) return res.status(200).json({presence: false});
        return res.status(200).json({ presence: true, accountId: doc.accountId });
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// check account presence
router.get("/account/:accountId", async (req, res) => {
    const {accountId} = req.params;
    try {
        const doc = await User.findOne({accountId});
        if (!doc) return res.status(200).json({presence: false});
        return res.status(200).json({ presence: true });
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// create user account
router.post("/new-account", async (req, res) => {
    const { accountId, username, name, reputation } = req.body;
    try {
        const newUser = new User({
            accountId,
            username,
            name,
            reputation,
            isCommunity: false
        });
        await newUser.save();
        return res.status(200).json("Account created successfully");
    } catch (err) {
        console.log(err);
        return res.status(500).json(JSON.stringify(err));
    }
});

// explore
router.post("/explore", async (req, res) => {
    const {keyword} = req.body;
    try {
        const docs = await User.find({
            $or: [
                {name: { "$regex": keyword, "$options": "i" }},
                {username: { "$regex": keyword, "$options": "i" }} 
            ]
        }).limit(10).select("accountId username name -_id");
        return res.status(200).json(docs);
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// top 5 rp
router.get("/rp-5", async (req, res) => {
    try {
        const docs = await User.find({})
        .sort({reputation: "descending"})
        .limit(5)
        .select("accountId username reputation -_id");
        return res.status(200).json(docs);
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// rp users
router.post("/rp", async (req, res) => {
    try {
        const skip = req.body?.skip || 0;
        const docs = await User.find({})
        .sort({ reputation: "descending" })
        .skip(skip)
        .limit(7)
        .select("accountId username reputation -_id");
        return res.status(200).json(docs);
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// get user's rp
router.get("/user-rp/:accountId", async (req, res) => {
    try {
        const doc = await User.findOne({
            accountId: req.params.accountId
        }).select("reputation -_id");
        return res.status(200).json(doc.reputation);
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// edit user profile
router.put("/user-edit/:accountId", async (req, res) => {
    try {
        await User.findOneAndUpdate(
            {accountId: req.params.accountId},
            {$set: req.body}
        );
        return res.status(200).json("Account has been uupdated");
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// incr RP
router.put("/incr-rp/:accountId/:points", async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { accountId: req.params.accountId },
            { $inc: {'reputation': Number(req.params.points)}}
        );
        return res.status(200).json("Incremented RP");
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

module.exports = router;
