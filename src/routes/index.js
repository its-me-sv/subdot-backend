const userRoute = require("./user");
const transactionRoute = require("./transaction");
const advertRoute = require("./advert");
const chatRoute = require("./chat");

const combineRoutes = app => {
    app.use("/api/user", userRoute);
    app.use("/api/transaction", transactionRoute);
    app.use("/api/advert", advertRoute);
    app.use("/api/chat", chatRoute);
};

module.exports = combineRoutes;
