const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const morganConfig = require("./morgan");

// const corsConfig = {
//     optionsSuccessStatus: 200,
//     origin: "https://subdot.netlify.app"
// };

const combineMiddlewares = (app) => {
    // if (process.env.NODE_ENV === "dev") 
    app.use(cors());
    // else app.use(cors(corsConfig));
    app.use(morgan(morganConfig));
    app.use(express.json());
};

module.exports = combineMiddlewares;
