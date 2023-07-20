const multer = require("multer");

const storage = multer.memoryStorage;
const multerUploads = multer({ storage }).single('userImage');

module.exports = {
    multerUploads,
    multerError: multer.MulterError
};