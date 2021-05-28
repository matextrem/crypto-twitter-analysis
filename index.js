const Twit = require('twit');
const language = require('@google-cloud/language');
const languageClient = new language.LanguageServiceClient();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const T = new Twit({
  consumer_key:        process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:     process.env.TWITTER_CONSUMER_SECRET,
  access_token:        process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SCRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

const USER_ID="44196397"
 const SCALES = [
     {
         from:-1,
         to:-0.50,
         text: 'very negative'
     },
     {
         from:-0.50,
         to:0,
         text: 'negative'
     },
     {
         from:0,
         to: 0.50,
         text: 'positive'
     },
     {
         from:0.50,
         to: 1,
         text: 'very positive'
     }
 ]

twitterListener(); 

async function twitterListener() {          
    try {
        const stream = T.stream('statuses/filter', { follow: [USER_ID] })
        stream.on('tweet', async function (tweet) {
           if(!tweet.in_reply_to_user_id && !tweet.retweeted_status){
                const score =  Number((await getSentimentScore(tweet.text)).toFixed(2))
                const sentimentalObj = SCALES.find((st) =>(score >= st.from && score < st.to))
                console.log(tweet.text)
                console.log(`The sentiment is ${sentimentalObj.text} (${score})`);    
           }
        })
    } catch(e) {
        console.log("There was an error fetching the tweet",e);
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
