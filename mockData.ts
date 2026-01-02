import { SystemState, CandlestickData, Trade } from '../types';

export const generateMockCandlestick = (): CandlestickData => {
  const basePrice = 100 + Math.random() * 50;
  const open = basePrice;
  const close = open + (Math.random() - 0.5) * 5;
  const high = Math.max(open, close) + Math.random() * 2;
  const low = Math.min(open, close) - Math.random() * 2;
  
  return {
    time: new Date().toISOString(),
    open,
    high,
    low,
    close,
    volume: Math.floor(Math.random() * 10000) + 1000
  };
};

export const generateMockCandle = (basePrice: number, volatility: number = 0.001) => {
  const open = basePrice + (Math.random() - 0.5) * volatility;
  const close = open + (Math.random() - 0.5) * volatility;
  const high = Math.max(open, close) + Math.random() * volatility * 0.5;
  const low = Math.min(open, close) - Math.random() * volatility * 0.5;
  
  return {
    time: new Date().toISOString(),
    open,
    high,
    low,
    close,
    volume: Math.floor(Math.random() * 10000) + 1000
  };
};

export const generateMockTrade = (): Trade => {
  const type = Math.random() > 0.5 ? 'BUY' : 'SELL';
  const amount = Math.floor(Math.random() * 1000) + 100;
  const entry_price = 100 + Math.random() * 50;
  
  return {
    id: `trade_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    type,
    asset: 'EURUSD',
    amount,
    entry_price,
    exit_price: entry_price + (Math.random() - 0.5) * 5,
    profit: (Math.random() - 0.3) * 500,
    status: 'COMPLETED'
  };
};

export const initialSystemState: SystemState = {
  saldo: 10000.00,
  lucro: 0.00,
  uptime: 0,
  status: 'BOOTING CORE...',
  ping: '0ms',
  cpu: '0%',
  ram: '0%',
  ops: 0,
  terminal: [
    'Iniciando protocolo VFSS Quantum Core...',
    'Verificando módulos de IA...',
    'Estabelecendo conexão segura SSL/TLS...',
    'Carregando modelos de Machine Learning...',
    'Aguardando sinal de mercado...'
  ],
  img: ''
};

const terminalMessages = [
  'Padrão de vela detectado - Analisando...',
  'Sinal de compra identificado - Executando ordem...',
  'Análise técnica concluída - RSI: 65.4',
  'Stop loss ajustado automaticamente',
  'Tendência de alta confirmada - MACD positivo',
  'Volume acima da média - Momentum forte',
  'Suporte identificado em R$ 145.30',
  'Resistência mapeada em R$ 152.80',
  'Ordem executada com sucesso - ID: #TRD-',
  'Lucro parcial realizado - Take profit atingido',
  'Correlação com índice detectada - 0.87',
  'Volatilidade aumentando - Ajustando estratégia',
  'Padrão de reversão identificado',
  'Fibonacci retracement calculado',
  'Bollinger Bands estreitando - Breakout iminente'
];

export const getRandomTerminalMessage = (): string => {
  const msg = terminalMessages[Math.floor(Math.random() * terminalMessages.length)];
  const id = Math.random().toString(36).substr(2, 6).toUpperCase();
  return msg + (msg.includes('ID:') ? id : '');
};

export const mockTrades: Trade[] = [
  {
    id: '1',
    timestamp: Date.now() - 3600000,
    type: 'BUY',
    asset: 'EURUSD',
    amount: 100,
    entry_price: 1.0850,
    exit_price: 1.0920,
    profit: 70,
    status: 'COMPLETED'
  },
  {
    id: '2',
    timestamp: Date.now() - 7200000,
    type: 'SELL',
    asset: 'GBPUSD',
    amount: 150,
    entry_price: 1.2650,
    exit_price: 1.2580,
    profit: 70,
    status: 'COMPLETED'
  },
  {
    id: '3',
    timestamp: Date.now() - 10800000,
    type: 'BUY',
    asset: 'USDJPY',
    amount: 200,
    entry_price: 149.50,
    exit_price: 149.20,
    profit: -30,
    status: 'COMPLETED'
  }
];