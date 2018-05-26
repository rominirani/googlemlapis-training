const fs = require('fs');
const cc = require('./config');

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

const credentials_config = {
    projectId: cc.projectId,
    keyFilename: cc.serviceAccountKeyFile
};

// Creates a client
const client = new textToSpeech.TextToSpeechClient(credentials_config);

const ssml = '<speak><prosody rate=\'+60%\'>I’m at 500 and I want 550<prosody volume=\'x-loud\'>550</prosody></prosody> <prosody rate=\'+60%\'>bid on 550 I’m at 500 would you go 550 550 for the gentleman in the corner</prosody> <prosody rate="+90%">A big black bug bit a big black bear a big black bug bit a big black bear</prosody> Do we get 600? <prosody rate=\'+90%\'>A big black bug bit a big black bear</prosody><prosody rate=\'+60%\'>We got 600 for the whole herd</prosody><prosody rate=\'default\' volume=\'x- loud\'>Sold <prosody rate=\'+60%\'>for 600.</prosody></prosody></speak>';
const outputFile = 'auction.mp3';

const request = {
        input: {ssml: ssml},
        voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
        audioConfig: {audioEncoding: 'MP3'},
    };

client.synthesizeSpeech(request, (err, response) => {
    if (err) {
        console.error('ERROR:', err);
        return;
    }

    fs.writeFile(outputFile, response.audioContent, 'binary', err => {
        if (err) {
            console.error('ERROR:', err);
            return;
        }
        console.log(`Audio content written to file: ${outputFile}`);
    });
});