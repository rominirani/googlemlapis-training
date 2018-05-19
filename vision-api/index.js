'use strict';
const Storage = require('@google-cloud/storage');
const Vision = require('@google-cloud/vision');

// Instantiates a client
const storage = Storage();
const vision = new Vision.ImageAnnotatorClient();

exports.analyzeImage = function (event, callback) {
    const file = event.data;
    console.log('Processing file: ' + file.name);

    if (file.resourceState === 'not_exists') {
        // This is a file deletion event, so skip it
        callback();
        return;
    }
    vision.safeSearchDetection(`gs://${file.bucket}/${file.name}`).then(response => {
        var target_bucket = "green-signal-bucket";
        var violence_possibility = response[0].safeSearchAnnotation.violence;
        if (violence_possibility === "POSSIBLE" || violence_possibility === "LIKELY" || violence_possibility === "VERY_LIKELY") {
            target_bucket = "red-signal-bucket";
        }
        //Move the file to the target bucket
        storage
            .bucket(file.bucket)
            .file(file.name)
            .move(storage.bucket(target_bucket))
            .then(() => {
                console.log("Image with violence has been moved successfully to " + target_bucket);
                callback();
            })
            .catch(err => {
                throw new Error('ERROR:' + err);
            });
    }).catch(err => {
        console.error('Error in performing the Safe Search operation. Reason : ' + err);
        callback();
    });
}