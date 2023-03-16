const router = require("express").Router();
const cqlClient = require("../utils/astra");

// add new transaction to user
router.post("/new", async (req, res) => {
    const {body: tx} = req;
    try {
        const QUERY = `
            INSERT INTO transactions 
            (account_id, created_at, amount, description, kind)
            VALUES (?, toTimeStamp(now()), ?, ?, ?);
        `;
        const VALUE = [tx.accountId, tx.amount, tx.desc, tx.kind];
        await cqlClient.execute(QUERY, VALUE, {prepare: true});
        return res.status(200).json("Transaction inserted");
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// fetch all transactions by accountId
router.post("/:accountId", async (req, res) => {
    try {
        const {accountId} = req.params;
        const currPage = req.body.page || null;
        const QUERY = `
            SELECT account_id, created_at, amount,
            description, kind FROM transactions
            WHERE account_id = ? 
            ORDER BY created_at DESC;
        `;
        const VALUE = [accountId];
        const data = await cqlClient.execute(QUERY, VALUE, {
            pageState: currPage,
            fetchSize: 14
        });
        const txs = data.rows || [];
        return res.status(200).json({
            txs: txs.map(tx => ({
                accountId: tx.account_id,
                desc: tx.description,
                kind: tx.kind,
                amount: Number(tx.amount),
                createdAt: tx.created_at,
                _id: tx.created_at
            })),
            page: data.pageState
        });
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

module.exports = router;
