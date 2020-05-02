const Twitter = require('twitter-lite');

(async function() {
    const user = new Twitter({
        consumer_key: "YOUR_API_KEY",
        consumer_secret: "YOUR_API_SECRET",
    });

    try {
        let response = await user.getBearerToken();
        const app = new Twitter({
            bearer_token: response.access_token,
        });

        response = await app.get(`/search/tweets`, {
            q: "Lionel Messi",
            lang: "en",
            count: 100,
        });

        for (tweet of response.statuses) {
            console.dir(tweet.text);
        }
    } catch(e) {
        console.log("There was an error calling the Twitter API");
        console.dir(e);
    }
})();
