require("dotenv").config();
const mongoose = require("mongoose");

const combineMiddlewares = require("./utils/middleware");
const {app} = require("./utils/server");
combineMiddlewares(app);

const userRoute = require("./routes/user");
app.use("/api/user", userRoute);

// base route
app.get("/", (req, res) => {
    return res.status(200).json("Base route for CACG API");
});

// all other invalid routes
app.get("/*", (req, res) => {
    res.redirect('/');
});

const PORT = process.env.port || 5000;
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
