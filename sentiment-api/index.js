'use strict';
const Storage = require('@google-cloud/storage');
const Language = require('@google-cloud/language');

// Instantiates a client
const storage = Storage();
const language = new Language.LanguageServiceClient();

exports.analyzeSentimentInFile = function (event, callback) {
    const file = event.data;
    console.log('Processing file: ' + file.name);

    if (file.resourceState === 'not_exists') {
        // This is a file deletion event, so skip it
        callback();
        return;
    }

    const document = {
        gcsContentUri: `gs://${file.bucket}/${file.name}`,
        type: 'PLAIN_TEXT',
    };

    language
        .analyzeSentiment({
            document: document
        })
        .then(results => {
            const sentiment = results[0].documentSentiment;
            console.log(`Document sentiment:`);
            console.log(`  Score: ${sentiment.score}`);
            console.log(`  Magnitude: ${sentiment.magnitude}`);

            const sentences = results[0].sentences;
            sentences.forEach(sentence => {
                console.log(`Sentence: ${sentence.text.content}`);
                console.log(`  Score: ${sentence.sentiment.score}`);
                console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
            });
            callback();
        })
        .catch(err => {
            console.error('ERROR:', err);
            callback();
        });
}

exports.classifyTextInFile = function (event, callback) {
    const file = event.data;
    console.log('Processing file: ' + file.name);

    if (file.resourceState === 'not_exists') {
        // This is a file deletion event, so skip it
        callback();
        return;
    }

    const document = {
        gcsContentUri: `gs://${file.bucket}/${file.name}`,
        type: 'PLAIN_TEXT',
    };

    // Classifies text in the document
    language
        .classifyText({
            document: document
        })
        .then(results => {
            const classification = results[0];

            console.log('Categories:');
            classification.categories.forEach(category => {
                console.log(
                    `Name: ${category.name}, Confidence: ${category.confidence}`
                );
            });
            callback();
        })
        .catch(err => {
            console.error('ERROR:', err);
            callback();
        });


}
