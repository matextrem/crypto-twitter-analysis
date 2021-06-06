import Twit from "twit";

export default class Twitter extends Twit {
  constructor(userId) {
    super({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SCRET,
      timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    });
    Object.assign(this, { userId });
  }

  stream(endpoint, filter) {
    return super.stream(endpoint, filter);
  }
}
