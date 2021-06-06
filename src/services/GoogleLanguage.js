import language from '@google-cloud/language';

export default class GoogleLanguage extends language.LanguageServiceClient {
  async getSentimentScore(text) {
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };
    try {
      // Detects the sentiment of the text
      const [result] = await super.analyzeSentiment({ document });
      const sentiment = result.documentSentiment;

      return sentiment.score;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('There was a problem getting text sentiment analysis', e);
    }
    return null;
  }
}
