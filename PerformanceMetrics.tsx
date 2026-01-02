import React from 'react';
import { TrendingUp, Target, Award, AlertTriangle } from 'lucide-react';

interface Metrics {
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
}

interface PerformanceMetricsProps {
  metrics: Metrics | null;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
  if (!metrics) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-lg p-6 shadow-2xl">
        <div className="text-center py-12 text-gray-500">
          <Target className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p>Aguardando dados de performance...</p>
        </div>
      </div>
    );
  }

  const getWinRateColor = (rate: number) => {
    if (rate >= 60) return 'text-green-400';
    if (rate >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProfitFactorColor = (factor: number) => {
    if (factor >= 2) return 'text-green-400';
    if (factor >= 1.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-lg p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-7 h-7 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">Métricas de Performance</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Win Rate */}
        <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-cyan-400">Win Rate</span>
            <Target className="w-5 h-5 text-cyan-400" />
          </div>
          <div className={`text-3xl font-bold ${getWinRateColor(metrics.win_rate)}`}>
            {metrics.win_rate.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {metrics.winning_trades}W / {metrics.losing_trades}L
          </div>
        </div>

        {/* Profit Factor */}
        <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-cyan-400">Profit Factor</span>
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <div className={`text-3xl font-bold ${getProfitFactorColor(metrics.profit_factor)}`}>
            {metrics.profit_factor.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Razão Lucro/Perda
          </div>
        </div>

        {/* Avg Profit */}
        <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-cyan-400">Lucro Médio</span>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-green-400">
            ${metrics.avg_profit.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Por trade vencedor
          </div>
        </div>

        {/* Avg Loss */}
        <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-cyan-400">Perda Média</span>
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-red-400">
            ${Math.abs(metrics.avg_loss).toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Por trade perdedor
          </div>
        </div>

        {/* Total Trades */}
        <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
          <div className="text-sm text-cyan-400 mb-2">Total de Trades</div>
          <div className="text-3xl font-bold text-white">{metrics.total_trades}</div>
        </div>

        {/* Daily P&L */}
        <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
          <div className="text-sm text-cyan-400 mb-2">P&L Diário</div>
          <div className={`text-3xl font-bold ${metrics.daily_pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ${metrics.daily_pnl.toFixed(2)}
          </div>
        </div>

        {/* Daily Trades */}
        <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
          <div className="text-sm text-cyan-400 mb-2">Trades Hoje</div>
          <div className="text-3xl font-bold text-white">
            {metrics.daily_trades}/{metrics.max_daily_trades}
          </div>
        </div>

        {/* Open Positions */}
        <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
          <div className="text-sm text-cyan-400 mb-2">Posições Abertas</div>
          <div className="text-3xl font-bold text-yellow-400">{metrics.open_positions}</div>
        </div>
      </div>

      {/* Risk Limits */}
      <div className="mt-6 p-4 bg-gray-800/30 border border-yellow-500/30 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          <h3 className="text-sm font-bold text-yellow-400">Limites de Risco</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Perda Diária Máxima:</span>
            <span className="ml-2 text-white font-bold">{metrics.max_daily_loss_pct}%</span>
          </div>
          <div>
            <span className="text-gray-400">Trades Diários Máximos:</span>
            <span className="ml-2 text-white font-bold">{metrics.max_daily_trades}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;