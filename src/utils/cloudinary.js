const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const uploadImage = async imageUri => {
    return await cloudinary.uploader.upload(imageUri, {
        folder: process.env.PRESET
    });
};

module.exports = {
    uploadImage,
};