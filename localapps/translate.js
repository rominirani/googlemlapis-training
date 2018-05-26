const Translate = require('@google-cloud/translate');
const cc = require('./config');

const credentials_config = {
    projectId: cc.projectId,
    keyFilename: cc.serviceAccountKeyFile
};

// Instantiates a client
const translate = new Translate(credentials_config);

// The text to translate
const text = 'Hello, world!';
// The target language
const target = 'hi';

// Translates some text into Russian
translate
    .translate(text, target)
    .then(results => {
        const translation = results[0];

        console.log(`Text: ${text}`);
        console.log(`Translation: ${translation}`);
    })
    .catch(err => {
        console.error('ERROR:', err);
    });