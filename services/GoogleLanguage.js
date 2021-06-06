import language from "@google-cloud/language";

export default class GoogleLanguage extends language.LanguageServiceClient {
  constructor() {
    super();
  }
  async getSentimentScore(text) {
    const document = {
      content: text,
      type: "PLAIN_TEXT",
    };
    try {
      // Detects the sentiment of the text
      const [result] = await super.analyzeSentiment({ document: document });
      const sentiment = result.documentSentiment;

      return sentiment.score;
    } catch (e) {
      console.error("There was a problem getting text sentiment analysis", e);
    }
  }
}
