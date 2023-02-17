const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");

const allowedOrigins = require("./origins");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: [...allowedOrigins]
    }
});

module.exports = {
    app,
    httpServer,
    io
};
