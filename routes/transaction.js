const router = require("express").Router();
const Transaction = require("../models/transaction");

// add new transaction to user
router.post("/new", async (req, res) => {
    return res.status(200).json("New transaction");
});

// fetch all transactions by accountId
router.get("/:accountId", async (req, res) => {
    return res.status(200).json(`${req.params.accountId}'s transactions`);
});

module.exports = router;
