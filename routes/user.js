const router = require("express").Router();
const User = require("../models/user");

// check username presence
router.get("/:username", async (req, res) => {
    const {username} = req.params;
    try {
        const doc = await User.findOne({username});
        if (!doc) return res.status(200).json({presence: false});
        return res.status(200).json({ presence: true });
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

module.exports = router;
