const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    accountId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    name: {
        type: String,
        required: true,
        index: { unique: false }
    },
    reputation: {
        type: Number,
        default: 0
    },
    isCommunity: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
