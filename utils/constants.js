export const USER_ID = process.env.USER_ID
export const BUY_ACTION = "buy"
export const SELL_ACTION = "sell"
export const DECIMALS_PRECISION=6;
export const SCALES = [
  {
    from: -1,
    to: -0.5,
    action: SELL_ACTION,
    percentage: 1,
    text: "very negative",
  },
  {
    from: -0.5,
    to: 0,
    action: SELL_ACTION,
    percentage: 0.5,
    text: "negative",
  },
  {
    from: 0,
    to: 0.5,
    action: BUY_ACTION,
    percentage: 0.5,
    text: "positive",
  },
  {
    from: 0.5,
    to: 1,
    action: BUY_ACTION,
    percentage: 1,
    text: "very positive",
  },
]

//TOKENS
export const USDT = "USDT"
export const BTC = "BTC"
export const DOGE = "DOGE"

//TOKEN RULES
export const BTC_RULE = "bitcoin|btc"
export const DOGE_RULE = "dogecoin|doge"
