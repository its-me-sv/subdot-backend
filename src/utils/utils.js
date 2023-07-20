const vision = require("@google-cloud/vision");

const visionClient = new vision.ImageAnnotatorClient({
    keyFilename: "./gcloud-creds.json"
});

const convertToDataURI = ({ mimetype, buffer: imageBuffer }) => {
    const base64 = Buffer.from(imageBuffer).toString("base64");
    const imageUri = `data:${mimetype};base64,${base64}`;
    return imageUri;
};

const hasNSFW = async (imgPath) => {
    const [result] = await visionClient.safeSearchDetection(imgPath);
    const detections = result.safeSearchAnnotation;
    return detections.adult === "LIKELY" 
        || detections.violence === "LIKELY" 
        || detections.racy === "LIKELY" 
        || detections.spoof === "LIKELY" 
        || detections.medical === "LIKELY";
};

module.exports = {
    convertToDataURI,
    hasNSFW
};