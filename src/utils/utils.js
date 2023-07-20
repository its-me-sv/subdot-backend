const convertToDataURI = ({ mimetype, buffer: imageBuffer }) => {
    const base64 = Buffer.from(imageBuffer).toString("base64");
    const imageUri = `data:${mimetype};base64,${base64}`;
    return imageUri;
};

module.exports = {
    convertToDataURI
};