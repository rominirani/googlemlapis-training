const vision = require('@google-cloud/vision');
const cc = require('./config');

const credentials_config = {
    projectId: cc.projectId,
    keyFilename: cc.serviceAccountKeyFile
};
// Creates a client
const client = new vision.ImageAnnotatorClient(credentials_config);

// Performs label detection on the image file
client
    .labelDetection('../sample-files/images/faces.jpg')
    .then(results => {
        const labels = results[0].labelAnnotations;

        console.log('Labels:');
        labels.forEach(label => console.log(label.description));
    })
    .catch(err => {
        console.error('ERROR:', err);
    });