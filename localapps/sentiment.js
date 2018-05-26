const cc = require('./config');
const language = require('@google-cloud/language');

const credentials_config = {
    projectId: cc.projectId,
    keyFilename: cc.serviceAccountKeyFile
};

// Instantiates a client
const client = new language.LanguageServiceClient(credentials_config);

// The text to analyze
const text = 'This is the worst service that I have ever seen';

const document = {
    content: text,
    type: 'PLAIN_TEXT',
};

// Detects the sentiment of the text
client
    .analyzeSentiment({document: document})
    .then(results => {
        const sentiment = results[0].documentSentiment;

        console.log(`Text: ${text}`);
        console.log(`Sentiment score: ${sentiment.score}`);
        console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    })
    .catch(err => {
        console.error('ERROR:', err);
    });