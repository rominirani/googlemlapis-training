# Google Cloud Machine Learning APIs Training

This project contains multiple projects that will be used during the training. Each of the projects is a Google Cloud Function that will be demonstrated during the course.

The projects are:

 - `hellogreeting-http` : Cloud Function with HTTP Trigger. Takes in a `data` parameter that is a JSON formatted data.
 - `hello-gcs` : Cloud Function with GCS Trigger. It gets invoked when a file is created/updated in GCS. 
 - `hello-pubsub` : Cloud Function with PubSub Trigger. It subscribes to a topic and is invoked when a message is published to that topic. 
 - `nl-api` : Apps Script that can used in a Google Document to perform Sentiment Analysis. Refer to the following [Google Codelab](https://codelabs.developers.google.com/codelabs/nlp-from-google-docs/index.html?index=..%2F..%2Fio2018#1)
 - `speech-api` : Cloud Function with GCS Trigger. This function processes a FLAC Audio file uploaded to the Storage bucket. It uses the Speech API to convert the Audio into Text. It then writes the Transcription into another Target Storage Bucket.
 - `vision-api` : Cloud Function with GCS Trigger. This function processes an image file. If the image contains "Violence" then it is moved to a red bucket. If it does not contain violence, it is moved to a green bucket.
 - `sentiment-api` : Cloud Function with GCS Trigger. This project has two cloud functions. One of them classifies the text into 100s of categories that the Natural Language API can do. The other cloud function analyzes the sentiment for each sentencec in the file and logs them into the console.
 - `translation-api` : Cloud Function with GCS Trigger. This function processes a file uploaded in English Text. It uses the Translation API to convert the English Text to Spanish. It writes the Spanish translation into files in a target bucket.
 
You can use Google Cloud Shell here to clone the repository. Simply click on the "Open in Cloud Shell" button below. This will clone the repository in your Google Cloud Account's Cloud Shell.
 
 [![Open in Cloud Shell](http://gstatic.com/cloudssh/images/open-btn.png)](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/rominirani/googlemlapis-training)
 
## Other Files
- `cleanup.txt` : Contains a set of `gcloud` commands to delete all the Google Cloud Platform resources created i.e. Cloud Functions, Cloud Pub/Sub Topic, Cloud Storage Bucket, etc. This script can be useful to start from scratch. Just ensure that you have done a `gcloud auth login` and `gcloud config set project <project-id>` for the particular Google Cloud Platform project.
- `deploy.txt` : Contains a set of `gcloud` commands to deploy all the above Cloud Functions. 

## Data Files
- `sample-files` : Several Text, Audio, Video, Image files are provided that can be used as you go through the different project.
