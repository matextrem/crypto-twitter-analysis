
# Twitter Semantic Analysis

This application will get recent tweets on a certain topic and perform sentiment analysis.

## Getting Started

To install all Node packages run the following command. 
```
npm install
```

Create a Twitter Application and copy the API key and Secret in the `index.js` file.

You should set up a Google Platform, enable the Cloud Natural Language API, create a service account and store the service account private key in this directory in a file called `gcloud-private-key.json`

Use the `searchForTweets("Query")` function to get the sentiment score of recent tweets on that topic.

Enjoy!