'use strict';
const Storage = require('@google-cloud/storage');
const Speech = require('@google-cloud/speech');

// Instantiates a client
const storage = Storage();
const speech = new Speech.SpeechClient();

exports.analyzeSpeech = function (event, callback) {
    const file = event.data;
    console.log('Processing file: ' + file.name);

    if (file.resourceState === 'not_exists') {
        // This is a file deletion event, so skip it
        callback();
        return;
    }

    //Check if txt extension then ignore it.
    if (file.name.split(".").pop() === ".txt") {
        callback();
        return;
    }

    const gcsUri = `gs://${file.bucket}/${file.name}`;
    const encoding = 'FLAC';
    const sampleRateHertz = 16000;
    const languageCode = 'en-US';

    const config = {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
    };

    const audio = {
        uri: gcsUri,
    };

    const request = {
        config: config,
        audio: audio,
    };

    // Detects speech in the audio file
    speech
        .recognize(request)
        .then(data => {
            const response = data[0];
            const transcription = response.results
                .map(result => result.alternatives[0].transcript)
                .join('\n');
            console.log(`Transcription: `, transcription);
            //Write this to the txt file in the same bucket
            let transcriptionFile = getWriteFileStream("my-transcription-files-bucket", file.name.replace(/\.[^/.]+$/, "") + ".txt");
            transcriptionFile.write(transcription);
            transcriptionFile.end()
            callback();
        })
        .catch(err => {
            console.error('ERROR:', err);
            callback();
        });
}

function getWriteFileStream(bucketname, filename) {
    return storage.bucket(bucketname).file(filename).createWriteStream();
}