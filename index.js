require("dotenv").config();
const mongoose = require("mongoose");
const combineMiddlewares = require("./utils/middleware");
const {app} = require("./utils/server");

combineMiddlewares(app);

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
