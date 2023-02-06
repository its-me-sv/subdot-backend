const router = require("express").Router();
const User = require("../models/user");

// check username presence
router.get("/:username", async (req, res) => {
    const {username} = req.params;
    res.status(200).json(username);
});

module.exports = router;
