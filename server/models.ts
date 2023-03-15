import mongoose from 'mongoose'

const MarketSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  ticker_id: { type: String, index: true },
  chain: { type: String, index: true },

  base_token: {
    contract: { type: String, index: true },
    symbol: {
      name: { type: String },
      precision: { type: Number }
    },
    str: { type: String },
    id: { type: String }
  },

  quote_token: {
    contract: { type: String },
    symbol: {
      name: { type: String },
      precision: { type: Number }
    },
    str: { type: String },
    id: { type: String }
  },

  min_buy: { type: Number },
  min_sell: { type: Number },
  frozen: { type: Boolean },
  fee: { type: Number },

  last_price: { type: Number },
  bid: { type: Number },
  ask: { type: Number },

  // New Fields
  base_volume: { type: Number },
  target_volume: { type: Number },

  volume24: { type: Number },
  volumeWeek: { type: Number },
  volumeMonth: { type: Number },

  change24: { type: Number },
  changeWeek: { type: Number },
  high24: { type: Number },
  low24: { type: Number }
})
MarketSchema.index({ chain: 1, id: 1 })
MarketSchema.index({ chain: 1, ticker_id: 1 })

const PoolPairSchema = new mongoose.Schema({
  chain: { type: String, index: true },
  pair_id: { type: Number, index: true },

  pool1: {
    contract: { type: String, index: true },
    symbol: { type: String, index: true }
  },

  pool2: {
    contract: { type: String, index: true },
    symbol: { type: String, index: true }
  }
})

const LiquiditySchema = new mongoose.Schema({
  chain: { type: String, index: true },
  pair_id: { type: Number, index: true },
  trx_id: { type: String },

  owner: { type: String, index: true },

  lp_token: { type: Number },
  liquidity1: { type: Number },
  liquidity2: { type: Number },

  pool1: { type: Number },
  pool2: { type: Number },

  supply: { type: Number },

  time: { type: Date, index: true },
  block_num: { type: Number }
})
//LiquiditySchema.index({})

const ExchangeSchema = new mongoose.Schema({
  chain: { type: String, index: true },
  pair_id: { type: Number, index: true },
  trx_id: { type: String },

  maker: { type: String, index: true },

  quantity_in: { type: Number },
  quantity_out: { type: Number },

  pool1: { type: Number },
  pool2: { type: Number },

  time: { type: Date, index: true },
  block_num: { type: Number }
})

const MatchSchema = new mongoose.Schema({
  chain: { type: String, index: true },
  market: { type: Number, index: true },
  type: { type: String, index: true },
  trx_id: { type: String },

  unit_price: { type: Number, index: true },

  ask: { type: Number },
  bid: { type: Number },

  asker: { type: String, index: true },
  bidder: { type: String, index: true },

  time: { type: Date, index: true },
  block_num: { type: Number }
})
MatchSchema.index({ chain: 1, market: 1 })
MatchSchema.index({ chain: 1, market: 1, time: -1 })
MatchSchema.index({ chain: 1, market: 1, asker: 1, bidder: 1 })
MatchSchema.index({ chain: 1, market: 1, time: 1, unit_price: -1 })

const BarSchema = new mongoose.Schema({
  timeframe: { type: String, index: true },
  chain: { type: String, index: true },
  market: { type: Number, index: true },

  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: { type: Number, default: 0 },
  time: { type: Date, index: true }
})
BarSchema.index({ chain: 1, timeframe: 1, market: 1, time: -1 }, { background: true })

const PoolChartPointSchema = new mongoose.Schema({
  chain: { type: String, index: true },
  pool: { type: Number, index: true },

  price: { type: Number, default: 0 },
  volume1: { type: Number, default: 0 },
  liquidity1: { type: Number, default: 0 },

  // Reverted
  price_r: { type: Number, default: 0 },
  volume2: { type: Number, default: 0 },
  liquidity2: { type: Number, default: 0 },

  time: { type: Date, index: true }
})
PoolChartPointSchema.index({ chain: 1, pool: 1, time: -1 }, { background: true })

const SettingsSchema = new mongoose.Schema({
  chain: { type: String, index: true },
  actions_stream_offset: { type: Object, default: {} }
})

const SwapPoolSchema = new mongoose.Schema({
  chain: { type: String, index: true },
  id: { type: Number, index: true },
  active: { type: Boolean, index: true },

  tokenA: {
    contract: { type: String, index: true },
    symbol: { type: String, index: true },
    quantity: { type: Number }
  },

  tokenB: {
    contract: { type: String, index: true },
    symbol: { type: String, index: true },
    quantity: { type: Number }
  },

  sqrtPriceX64: { type: Number },
  tick: { type: Number },

  fee: { type: Number, index: true },
  feeProtocol: { type: Number, index: true },
  tickSpacing: { type: Number, index: true },

  maxLiquidityPerTick: { type: Number },

  feeGrowthGlobalAX64: { type: Number },
  feeGrowthGlobalBX64: { type: Number },

  protocolFeeA: { type: Number },
  protocolFeeB: { type: Number },
  liquidity: { type: Number },
  creator: { type: String },

  // TODO Change 24/week/month

  // New Fields
  volumeA24: { type: Number },
  volumeB24: { type: Number },

  volumeAWeek: { type: Number },
  volumeBWeek: { type: Number },

  volumeAMonth: { type: Number },
  volumeBMonth: { type: Number },
})

// Every hour cahrt basic point for info
const SwapChartPointSchema = new mongoose.Schema({
  chain: { type: String, index: true },
  pool: { type: Number, index: true },

  // Sqt
  price: { type: Number },
  liquidity: { type: Number },

  volumeA: { type: Number, default: 0 },
  volumeB: { type: Number, default: 0 },

  time: { type: Date, index: true }
})
PoolChartPointSchema.index({ chain: 1, pool: 1, time: -1 }, { background: true })

const SwapSchema = new mongoose.Schema({
  chain: { type: String, index: true },
  pool: { type: Number, index: true },
  trx_id: { type: String },

  recipient: { type: String, index: true },
  sender: { type: String, index: true },

  price: { type: Number },

  tokenA: { type: Number },
  tokenB: { type: Number },

  time: { type: Date, index: true },
})

const PositionSchema = new mongoose.Schema({
  id: { type: Number },
  chain: { type: String, index: true },
  pool: { type: Number, index: true },

  owner: { type: String, index: true },

  // Stores values on position create and change. Add liquidity positive, sub negative. Stores values in $USD
  pNl: { type: [Number] },

  // TODO May be store position rows values
  // price: { type: Number },
  // tokenA: { type: Number },
  // tokenB: { type: Number },

  time: { type: Date, index: true },
})

export const Market = mongoose.model('Market', MarketSchema)
export const PoolPair = mongoose.model('PoolPair', PoolPairSchema)
export const Liquidity = mongoose.model('Liquidity', LiquiditySchema)
export const Exchange = mongoose.model('Exchange', ExchangeSchema)
export const Match = mongoose.model('Match', MatchSchema)
export const Bar = mongoose.model('Bar', BarSchema)
export const PoolChartPoint = mongoose.model('PoolChartPoint', PoolChartPointSchema)
export const Settings = mongoose.model('Settings', SettingsSchema)
export const SwapPool = mongoose.model('SwapPool', SwapPoolSchema)
