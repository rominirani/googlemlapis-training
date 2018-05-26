const videoIntelligence = require('@google-cloud/video-intelligence');
const cc = require('./config');

const credentials_config = {
    projectId: cc.projectId,
    keyFilename: cc.serviceAccountKeyFile
};

// Creates a client
const client = new videoIntelligence.VideoIntelligenceServiceClient(credentials_config);

// The GCS uri of the video to analyze
const gcsUri = 'gs://nodejs-docs-samples-video/quickstart_short.mp4';

// Construct request
const request = {
    inputUri: gcsUri,
    features: ['LABEL_DETECTION'],
};

// Execute request
client
    .annotateVideo(request)
    .then(results => {
        const operation = results[0];
        console.log(
            'Waiting for operation to complete... (this may take a few minutes)'
        );
        return operation.promise();
    })
    .then(results => {
        // Gets annotations for video
        const annotations = results[0].annotationResults[0];

        // Gets labels for video from its annotations
        const labels = annotations.segmentLabelAnnotations;
        labels.forEach(label => {
            console.log(`Label ${label.entity.description} occurs at:`);
            label.segments.forEach(segment => {
                segment = segment.segment;
                if (segment.startTimeOffset.seconds === undefined) {
                    segment.startTimeOffset.seconds = 0;
                }
                if (segment.startTimeOffset.nanos === undefined) {
                    segment.startTimeOffset.nanos = 0;
                }
                if (segment.endTimeOffset.seconds === undefined) {
                    segment.endTimeOffset.seconds = 0;
                }
                if (segment.endTimeOffset.nanos === undefined) {
                    segment.endTimeOffset.nanos = 0;
                }
                console.log(
                    `\tStart: ${segment.startTimeOffset.seconds}` +
                    `.${(segment.startTimeOffset.nanos / 1e6).toFixed(0)}s`
                );
                console.log(
                    `\tEnd: ${segment.endTimeOffset.seconds}.` +
                    `${(segment.endTimeOffset.nanos / 1e6).toFixed(0)}s`
                );
            });
        });
    })
    .catch(err => {
        console.error('ERROR:', err);
    });