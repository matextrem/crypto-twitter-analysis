import BinanceAPI from 'node-binance-api';
import {
  BTC,
  BTC_RULE,
  DOGE,
  DOGE_RULE,
  BUY_ACTION,
  USDT,
  DECIMALS_PRECISION,
} from '../utils/constants';

export default class Binance {
  constructor() {
    Object.assign(
      this,
      new BinanceAPI().options({
        APIKEY: process.env.BINANCE_API_KEY,
        APISECRET: process.env.BINANCE_API_SECRET,
      }),
    );
  }

  async doMarketOperation(percentage, operation, token) {
    try {
      const pair = `${token}${USDT}`;
      const balances = await this.balance();
      const price = (await this.prices(pair))[pair];
      if (operation === BUY_ACTION) {
        await this.marketBuy(
          pair,
          Number(
            ((balances.USDT.available * percentage) / Number(price)).toFixed(
              DECIMALS_PRECISION,
            ),
          ),
        );
      } else {
        await this.marketSell(
          pair,
          Number(
            (balances[token].available * percentage).toFixed(DECIMALS_PRECISION),
          ),
        );
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(
        'There was an error performing a Binance operation',
        e.toJSON().body,
      );
    }
  }

  static getCryptoTokenFromText(text) {
    if (text.toLowerCase().match(`/${BTC_RULE}/`)) return BTC;
    if (text.toLowerCase().match(`/${DOGE_RULE}/`)) return DOGE;
    return undefined;
  }
}
