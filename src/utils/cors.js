const allowedOrigins = require("./origins");

const corsConfig = {
    origin: (origin, cb) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            cb(null, true);
        } else {
            cb(new Error("Blocked by cors"));
        }
    }
};

module.exports = corsConfig;
