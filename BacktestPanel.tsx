import React, { useState } from 'react';
import { BarChart3, Play } from 'lucide-react';

interface BacktestPanelProps {
  onRunBacktest: (config: any) => void;
}

const BacktestPanel: React.FC<BacktestPanelProps> = ({ onRunBacktest }) => {
  const [config, setConfig] = useState({
    asset: 'EURUSD',
    periods: 1000,
    start_balance: 10000
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleRun = async () => {
    setLoading(true);
    const result = await onRunBacktest(config);
    setResults(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-lg p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-7 h-7 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">Backtesting</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-2">Ativo</label>
          <select
            value={config.asset}
            onChange={(e) => setConfig({ ...config, asset: e.target.value })}
            className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="EURUSD">EUR/USD</option>
            <option value="GBPUSD">GBP/USD</option>
            <option value="USDJPY">USD/JPY</option>
            <option value="AUDUSD">AUD/USD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-2">Períodos</label>
          <input
            type="number"
            value={config.periods}
            onChange={(e) => setConfig({ ...config, periods: parseInt(e.target.value) })}
            className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-2">Saldo Inicial</label>
          <input
            type="number"
            value={config.start_balance}
            onChange={(e) => setConfig({ ...config, start_balance: parseFloat(e.target.value) })}
            className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <button
        onClick={handleRun}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50"
      >
        <Play className="w-5 h-5" />
        {loading ? 'Executando...' : 'Executar Backtest'}
      </button>

      {results && results.metrics && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
              <div className="text-xs text-cyan-400 mb-1">Retorno Total</div>
              <div className={`text-2xl font-bold ${results.metrics.total_return_pct >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {results.metrics.total_return_pct.toFixed(2)}%
              </div>
            </div>

            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
              <div className="text-xs text-cyan-400 mb-1">Win Rate</div>
              <div className="text-2xl font-bold text-white">
                {results.metrics.win_rate.toFixed(1)}%
              </div>
            </div>

            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
              <div className="text-xs text-cyan-400 mb-1">Sharpe Ratio</div>
              <div className="text-2xl font-bold text-white">
                {results.metrics.sharpe_ratio.toFixed(2)}
              </div>
            </div>

            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
              <div className="text-xs text-cyan-400 mb-1">Max Drawdown</div>
              <div className="text-2xl font-bold text-red-400">
                {results.metrics.max_drawdown_pct.toFixed(2)}%
              </div>
            </div>
          </div>

          <div className="bg-gray-800/30 border border-cyan-500/20 rounded-lg p-4">
            <div className="text-sm text-cyan-400 mb-2">Resumo</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-400">Total de Trades: <span className="text-white font-bold">{results.metrics.total_trades}</span></div>
              <div className="text-gray-400">Trades Vencedores: <span className="text-green-400 font-bold">{results.metrics.winning_trades}</span></div>
              <div className="text-gray-400">Trades Perdedores: <span className="text-red-400 font-bold">{results.metrics.losing_trades}</span></div>
              <div className="text-gray-400">Profit Factor: <span className="text-white font-bold">{results.metrics.profit_factor.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BacktestPanel;