const { Client } = require("cassandra-driver");

const client = new Client({
    cloud: {
        secureConnectBundle: './secure-connect-subdot.zip'
    },
    credentials: {
        username: process.env.ASTRA_CLIENT_ID,
        password: process.env.ASTRA_SECRET,
    },
    keyspace: process.env.ASTRA_KEYSPACE
});

client
    .connect()
    .then(() => console.log("[SERVER] Connected to AstraDB"))
    .catch((err) => console.log(`[SERVER] AstraDB connection FAILURE - ${err.message}`));

module.exports = client;
