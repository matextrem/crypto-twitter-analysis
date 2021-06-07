import dotenv from 'dotenv';
import express from 'express';
import Binance from './services/Binance';
import Twitter from './services/Twitter';
import GoogleLanguage from './services/GoogleLanguage';

import { SCALES } from './utils/constants';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

function main() {
  const twitter = new Twitter(process.env.USER_ID);
  const binance = new Binance();
  const language = new GoogleLanguage();
  const stream = twitter.stream('statuses/filter', { follow: [twitter.userId] });
  stream.on('tweet', async (tweet) => {
    if (!tweet.in_reply_to_user_id && !tweet.retweeted_status) {
      try {
        const score = Number(
          (await language.getSentimentScore(tweet.text)).toFixed(2),
        );
        const sentimentalObj = SCALES.find(
          (st) => score >= st.from && score < st.to,
        );
        const cryptoToken = Binance.getCryptoTokenFromText(tweet.text);
        if (!cryptoToken) return;
        binance.doMarketOperation(
          sentimentalObj.percentage,
          sentimentalObj.action,
          cryptoToken,
        );
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('There was an error fetching the tweet', e);
      }
    }
  });
}

app.get('/ping', (_, res) => res.send('pong'));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App started: Listening at ${port}`);
  main();
});
