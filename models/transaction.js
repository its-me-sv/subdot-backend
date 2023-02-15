const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    accountId: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    kind: {
        type: Boolean,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Transaction", TransactionSchema);
