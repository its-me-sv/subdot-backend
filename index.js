require("dotenv").config();
require("./src/utils/astra");

const mongoose = require("mongoose");
const combineMiddlewares = require("./src/utils/middleware");
const combineRoutes = require("./src/routes");
const socketHandler = require("./src/utils/socket");

const {app, io, httpServer} = require("./src/utils/server");

combineMiddlewares(app);
combineRoutes(app);
socketHandler(io);

// base route
app.get("/", (req, res) => {
    return res.status(200).json("Base route for Subdot");
});

// all other invalid routes
app.get("/*", (req, res) => {
    return res.status(400).json("Invalid route");
});

// port declaration & server spin up
const PORT = process.env.PORT || 5000;
const server = httpServer.listen(PORT, async () => {
    console.clear();
    console.log(`[SERVER] Listening to PORT ${PORT}`);
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "subdot"
        });
        console.log("[SERVER] Connected to MongoDB");
    } catch (err) {
        console.log(`[SERVER] MongoDB connection FAILURE - ${err.message}`);
    }
});

// purposely crashing
process.on("uncaughtException", async err => {
    server.close();
    console.log(`[SERVER] App crashed due to ${err.message}`);
    process.exit(1);
});
