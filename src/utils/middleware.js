const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const morganConfig = require("./morgan");
const corsConfig = require("./cors");

const combineMiddlewares = (app) => {
    app.use(cors(corsConfig));
    app.use(morgan(morganConfig));
    app.use(express.json());
};

module.exports = combineMiddlewares;
