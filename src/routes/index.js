const userRoute = require("./user");
const transactionRoute = require("./transaction");
const advertRoute = require("./advert");

const combineRoutes = app => {
    app.use("/api/user", userRoute);
    app.use("/api/transaction", transactionRoute);
    app.use("/api/advert", advertRoute);
};

module.exports = combineRoutes;
