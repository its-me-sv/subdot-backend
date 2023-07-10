const router = require("express").Router();
const { types } = require("cassandra-driver");
const cqlClient = require("../utils/astra");

// new message between two users
router.post("/:sender/:reciever/:ipfs_id", async (req, res) => {
    try {
        const {sender, reciever, ipfs_id} = req.params;
        const chatId = [sender, reciever].sort().join("###");
        const message_id = types.TimeUuid.now().toString();
        const query = `
            INSERT INTO messages(chat_id, message_id, ipfs_content_id, verified)
            VALUES (?, ?, ?, false)
            USING TTL 30;
        `;
        const values = [chatId, message_id, ipfs_id];
        await cqlClient.execute(query, values, {prepare: true});
        return res.status(200).json({
            message_id,
            created_at: new Date().toISOString(),
            ipfs_content_id: ipfs_id,
            verified: false
        });
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// update verification status
router.put("/:sender/:reciever/:ipfs_id/:msgId", async (req, res) => {
    try {
        const { sender, reciever, msgId, ipfs_id } = req.params;
        const chatId = [sender, reciever].sort().join("###");
        const query = `
            UPDATE messages
            USING TTL 0
            SET verified = true, ipfs_content_id = ?
            WHERE chat_id = ? AND message_id = ?;
        `;
        const param = [ipfs_id, chatId, msgId];
        await cqlClient.execute(query, param, {prepare: true});
        return res.status(200).json("SUCCESS");
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

// fetch messages between two users
router.post("/:sender/:reciever", async (req, res) => {
    try {
        const {sender, reciever} = req.params;
        const currPage = req.body.page || null;
        const chatId = [sender, reciever].sort().join("###");
        const QUERY = `
            SELECT message_id, totimestamp(message_id) as created_at,
            ipfs_content_id, verified  FROM messages
            WHERE chat_id = ?;
        `;
        const VALUE = [chatId];
        const data = await cqlClient.execute(QUERY, VALUE, {
            pageState: currPage,
            fetchSize: 20
        });
        return res.status(200).json({
            messages: data.rows || [],
            page: data.pageState
        });
    } catch (err) {
        return res.status(500).json(JSON.stringify(err));
    }
});

module.exports = router;
