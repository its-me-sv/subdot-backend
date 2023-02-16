const mongoose = require("mongoose");

const AdvertSchema = new mongoose.Schema({
    accountId: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        required: true,
    }
});

AdvertSchema.index({expires: 1}, {expireAfterSeconds: 1});

module.exports = mongoose.model("Advert", AdvertSchema);
