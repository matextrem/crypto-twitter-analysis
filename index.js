const Twitter = require('twitter-lite');
const language = require('@google-cloud/language');
const languageClient = new language.LanguageServiceClient();
const user = new Twitter({
    consumer_key: "YOUR_API_KEY",
    consumer_secret: "YOUR_API_SECRET",
});

searchForTweets("lionel messi");

async function searchForTweets(query) {
    try {
        let response = await user.getBearerToken();
        const app = new Twitter({
            bearer_token: response.access_token,
        });

        response = await app.get(`/search/tweets`, {
            q: query,
            lang: "en",
            count: 100,
        });

        let allTweets = "";
        for (tweet of response.statuses) {
            allTweets += tweet.text + "\n";
        }

        const sentimentScore = await getSentimentScore(allTweets);
        console.log(`The sentiment about ${query} is: ${sentimentScore}`);

    } catch(e) {
        console.log("There was an error calling the Twitter API");
        console.dir(e);
    }
}

async function getSentimentScore(text) {
    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    // Detects the sentiment of the text
    const [result] = await languageClient.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;

    return sentiment.score;
}
