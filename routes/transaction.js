const router = require("express").Router();
const Transaction = require("../models/transaction");

// add new transaction to user
router.post("/new", async (req, res) => {
    const {body: tx} = req;
    try {
        const newTx = new Transaction(tx);
        const doc = await newTx.save();
        return res.status(200).json(doc);
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// fetch all transactions by accountId
router.get("/:accountId", async (req, res) => {
    const {accountId} = req.params;
    try {
        return res.status(200).json(`${req.params.accountId}'s transactions`);
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

module.exports = router;
