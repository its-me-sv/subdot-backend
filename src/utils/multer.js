const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/temp');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/').slice(-1)[0]);
    }
});
const multerUploads = multer({ storage }).single('userImage');

module.exports = {
    multerUploads,
    multerError: multer.MulterError
};