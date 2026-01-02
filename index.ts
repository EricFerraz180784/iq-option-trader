export interface SystemState {
  saldo: number;
  lucro: number;
  uptime: number;
  status: string;
  ping: string;
  cpu: string;
  ram: string;
  ops: number;
  terminal: string[];
  img: string;
}

export interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Trade {
  id: string;
  timestamp: number;
  type: 'BUY' | 'SELL';
  asset: string;
  amount: number;
  entry_price: number;
  exit_price?: number;
  profit?: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
}

export interface Alert {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  timestamp: number;
}

export interface Metrics {
  winRate: number;
  totalTrades: number;
  avgProfit: number;
  maxDrawdown: number;
  sharpeRatio: number;
}

export interface TechnicalIndicators {
  rsi: number;
  macd: number;
  macd_signal: number;
  macd_histogram: number;
  bb_upper: number;
  bb_middle: number;
  bb_lower: number;
  ma_20: number;
  ma_50: number;
  volume_ratio: number;
}

export interface Signal {
  signal: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  indicators: TechnicalIndicators;
  patterns: string[];
  scores: {
    buy: number;
    sell: number;
  };
  timestamp: string;
}

export interface RobotStatus {
  is_running: boolean;
  mode: 'SIMULATION' | 'REAL';
  active_assets: string[];
  timeframe: number;
  min_confidence: number;
  statistics: {
    total_trades: number;
    winning_trades: number;
    losing_trades: number;
    win_rate: number;
    avg_profit: number;
    avg_loss: number;
    profit_factor: number;
    daily_pnl: number;
    daily_trades: number;
    open_positions: number;
    max_daily_loss_pct: number;
    max_daily_trades: number;
  };
}

export interface BacktestResult {
  asset: string;
  start_balance: number;
  end_balance: number;
  total_trades: number;
  trades: Trade[];
  equity_curve: number[];
  metrics: {
    total_trades: number;
    winning_trades: number;
    losing_trades: number;
    win_rate: number;
    total_return: number;
    total_return_pct: number;
    profit_factor: number;
    sharpe_ratio: number;
    max_drawdown_pct: number;
    avg_win: number;
    avg_loss: number;
    avg_bars_held: number;
  };
  timestamp: string;
}