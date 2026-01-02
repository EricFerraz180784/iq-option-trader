import React from 'react';
import { TrendingUp, TrendingDown, Minus, Activity, Target } from 'lucide-react';

interface Signal {
  signal: string;
  confidence: number;
  indicators: {
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
  };
  patterns: string[];
  scores: {
    buy: number;
    sell: number;
  };
  timestamp: string;
}

interface RealTimeSignalsProps {
  signals: Record<string, Signal>;
}

const RealTimeSignals: React.FC<RealTimeSignalsProps> = ({ signals }) => {
  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return <TrendingUp className="w-6 h-6 text-green-400" />;
      case 'SELL':
        return <TrendingDown className="w-6 h-6 text-red-400" />;
      default:
        return <Minus className="w-6 h-6 text-gray-400" />;
    }
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return 'border-green-500/50 bg-green-500/10';
      case 'SELL':
        return 'border-red-500/50 bg-red-500/10';
      default:
        return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-lg p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-7 h-7 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">Sinais em Tempo Real</h2>
      </div>

      <div className="space-y-4">
        {Object.entries(signals).length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Target className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Aguardando sinais de mercado...</p>
          </div>
        ) : (
          Object.entries(signals).map(([asset, signal]) => (
            <div
              key={asset}
              className={`border-2 rounded-lg p-4 transition-all duration-300 ${getSignalColor(signal.signal)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getSignalIcon(signal.signal)}
                  <div>
                    <h3 className="text-lg font-bold text-white">{asset}</h3>
                    <p className="text-sm text-gray-400">
                      {new Date(signal.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{signal.signal}</div>
                  <div className={`text-sm font-mono ${getConfidenceColor(signal.confidence)}`}>
                    {signal.confidence.toFixed(1)}% confiança
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <div className="bg-gray-800/50 rounded p-2">
                  <div className="text-xs text-cyan-400">RSI</div>
                  <div className="text-sm font-mono text-white">{signal.indicators.rsi.toFixed(2)}</div>
                </div>
                <div className="bg-gray-800/50 rounded p-2">
                  <div className="text-xs text-cyan-400">MACD</div>
                  <div className="text-sm font-mono text-white">{signal.indicators.macd.toFixed(4)}</div>
                </div>
                <div className="bg-gray-800/50 rounded p-2">
                  <div className="text-xs text-cyan-400">MA 20</div>
                  <div className="text-sm font-mono text-white">{signal.indicators.ma_20.toFixed(4)}</div>
                </div>
                <div className="bg-gray-800/50 rounded p-2">
                  <div className="text-xs text-cyan-400">Volume</div>
                  <div className="text-sm font-mono text-white">{signal.indicators.volume_ratio.toFixed(2)}x</div>
                </div>
              </div>

              {signal.patterns.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {signal.patterns.map((pattern) => (
                    <span
                      key={pattern}
                      className="px-2 py-1 bg-purple-500/20 border border-purple-500/40 rounded text-xs font-mono text-purple-300"
                    >
                      {pattern}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-3 flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-green-500 h-full transition-all duration-300"
                      style={{ width: `${(signal.scores.buy / (signal.scores.buy + signal.scores.sell)) * 100}%` }}
                    />
                  </div>
                  <span className="text-green-400">Buy: {signal.scores.buy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-red-500 h-full transition-all duration-300"
                      style={{ width: `${(signal.scores.sell / (signal.scores.buy + signal.scores.sell)) * 100}%` }}
                    />
                  </div>
                  <span className="text-red-400">Sell: {signal.scores.sell}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RealTimeSignals;