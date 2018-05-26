const speech = require('@google-cloud/speech');
const fs = require('fs');
const cc = require('./config');


const credentials_config = {
    projectId: cc.projectId,
    keyFilename: cc.serviceAccountKeyFile
};

// Creates a client
const client = new speech.SpeechClient(credentials_config);

// The name of the audio file to transcribe
const fileName = '../sample-files/audio/a2.flac';

// Reads a local audio file and converts it to base64
const file = fs.readFileSync(fileName);
const audioBytes = file.toString('base64');

// The audio file's encoding, sample rate in hertz, and BCP-47 language code
const audio = {
    content: audioBytes,
};
const config = {
    encoding: 'FLAC',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
};
const request = {
    audio: audio,
    config: config,
};

// Detects speech in the audio file
client
    .recognize(request)
    .then(data => {
        const response = data[0];
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
        console.log(`Transcription: ${transcription}`);
    })
    .catch(err => {
        console.error('ERROR:', err);
    });