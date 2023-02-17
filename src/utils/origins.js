const allowedOrigins = ["https://subdot.netlify.app"];

if (process.env.NODE_ENV === "dev") {
    allowedOrigins.push("http://192.168.29.97:5173");
    allowedOrigins.push("http://localhost:5173");
}

module.exports = allowedOrigins;
