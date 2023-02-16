require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRoute = require("./src/routes/user");
const transactionRoute = require("./src/routes/transaction");
const advertRoute = require("./src/routes/advert");

const {app} = require("./src/utils/server");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api/advert", advertRoute);

// base route
app.get("/", (req, res) => {
    return res.status(200).json("Base route for Subdot");
});

// all other invalid routes
app.get("/*", (req, res) => {
    return res.status(400).json("Invalid route");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.clear();
    console.log(`[SERVER] Listening to PORT ${PORT}`);
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "subdot"
        });
        console.log("[SERVER] Database connection SUCCESS");
    } catch (err) {
        console.log(`[SERVER] Database connection FAILURE - ${err.message}`);
    }
});
