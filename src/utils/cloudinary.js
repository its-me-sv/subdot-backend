const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async imageUri => {
    return await cloudinary.uploader.upload(imageUri, {
        folder: process.env.CLOUDINARY_PRESET
    });
};

module.exports = {
    uploadImage,
};