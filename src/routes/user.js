const router = require("express").Router();
const User = require("../models/user");
const cqlClinet = require("../utils/astra");

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
                {username: { "$regex": keyword, "$options": "i" }},
                {accountId: { "$regex": keyword, "$options": "i" }},
            ]
        }).limit(10).select("accountId username name reputation -_id");
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

// fetch user's all time reputation stats
router.get("/all-time-stats/:accountId", async (req, res) => {
    try {
        const {accountId} = req.params;
        const QUERY = `
            SELECT total_rp, e5p, p10f, ptg, ac
            FROM user_reputation_all_time
            WHERE user_id = ?;
        `;
        const PARAM = [accountId];
        const data = await cqlClinet.execute(QUERY, PARAM, {prepare: true});
        if (!data.rowLength) {
            return res.status(200).json({
                total_rp: 0,
                e5p: 0,
                p10f: 0,
                ptg: 0,
                ac: 1
            });
        }
        return res.status(200).json(data.rows[0]);
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// update all time rp
router.put("/all-time-stats/:accountId/:kind/:cnt", async (req, res) => {
    try {
        const {accountId, kind, cnt} = req.params;
        const QUERY = `
            UPDATE user_reputation_all_time
            SET total_rp = total_rp + ?, ${kind} = ${kind} + ?
            WHERE user_id = ?;
        `;
        const PARAM = [accountId, Number(cnt), Number(cnt)];
        await cqlClinet.execute(QUERY, PARAM, {prepare: true});
        return res.status(200).json("Incremented RP");
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

module.exports = router;
