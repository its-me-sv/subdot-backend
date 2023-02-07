const router = require("express").Router();
const User = require("../models/user");

// check username presence
router.get("/username/:username", async (req, res) => {
    const {username} = req.params;
    try {
        const doc = await User.findOne({username});
        if (!doc) return res.status(200).json({presence: false});
        return res.status(200).json({ presence: true });
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

module.exports = router;
