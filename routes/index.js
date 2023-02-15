const userRoute = require("./user");
const transactionRoute = require("./transaction");

const combineRoutes = app => {
    app.use("/api/user", userRoute);
    app.use("/api/transaction", transactionRoute);
};

module.exports = combineRoutes;
