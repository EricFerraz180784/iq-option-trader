import React, { useState } from 'react';
import { Settings, Save, RotateCcw } from 'lucide-react';

interface StrategyConfigProps {
  onSave: (config: any) => void;
}

const StrategyConfig: React.FC<StrategyConfigProps> = ({ onSave }) => {
  const [config, setConfig] = useState({
    mode: 'SIMULATION',
    active_assets: ['EURUSD', 'GBPUSD', 'USDJPY'],
    timeframe: 60,
    min_confidence: 70,
    max_position_size: 2,
    max_daily_loss: 5,
    max_daily_trades: 20,
    stop_loss_pct: 2,
    take_profit_pct: 4
  });

  const handleChange = (field: string, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(config);
  };

  const handleReset = () => {
    setConfig({
      mode: 'SIMULATION',
      active_assets: ['EURUSD', 'GBPUSD', 'USDJPY'],
      timeframe: 60,
      min_confidence: 70,
      max_position_size: 2,
      max_daily_loss: 5,
      max_daily_trades: 20,
      stop_loss_pct: 2,
      take_profit_pct: 4
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-lg p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Settings className="w-7 h-7 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Configuração de Estratégia</h2>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-all duration-300 border border-gray-600"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
          >
            <Save className="w-4 h-4" />
            Salvar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Modo de Operação */}
        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-2">
            Modo de Operação
          </label>
          <select
            value={config.mode}
            onChange={(e) => handleChange('mode', e.target.value)}
            className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="SIMULATION">Simulação (Paper Trading)</option>
            <option value="REAL">Real (Dinheiro Real)</option>
          </select>
        </div>

        {/* Timeframe */}
        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-2">
            Timeframe (segundos)
          </label>
          <input
            type="number"
            value={config.timeframe}
            onChange={(e) => handleChange('timeframe', parseInt(e.target.value))}
            className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Confiança Mínima */}
        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-2">
            Confiança Mínima (%)
          </label>
          <input
            type="range"
            min="50"
            max="95"
            step="5"
            value={config.min_confidence}
            onChange={(e) => handleChange('min_confidence', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-white font-mono mt-1">{config.min_confidence}%</div>
        </div>

        {/* Tamanho Máximo da Posição */}
        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-2">
            Tamanho Máximo da Posição (% do capital)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={config.max_position_size}
            onChange={(e) => handleChange('max_position_size', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-white font-mono mt-1">{config.max_position_size}%</div>
        </div>

        {/* Perda Diária Máxima */}
        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-2">
            Perda Diária Máxima (%)
          </label>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={config.max_daily_loss}
            onChange={(e) => handleChange('max_daily_loss', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-white font-mono mt-1">{config.max_daily_loss}%</div>
        </div>

        {/* Trades Diários Máximos */}
        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-2">
            Trades Diários Máximos
          </label>
          <input
            type="number"
            value={config.max_daily_trades}
            onChange={(e) => handleChange('max_daily_trades', parseInt(e.target.value))}
            className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Stop Loss */}
        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-2">
            Stop Loss (%)
          </label>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={config.stop_loss_pct}
            onChange={(e) => handleChange('stop_loss_pct', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-white font-mono mt-1">{config.stop_loss_pct}%</div>
        </div>

        {/* Take Profit */}
        <div>
          <label className="block text-sm font-semibold text-cyan-400 mb-2">
            Take Profit (%)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={config.take_profit_pct}
            onChange={(e) => handleChange('take_profit_pct', parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-white font-mono mt-1">{config.take_profit_pct}%</div>
        </div>
      </div>

      {/* Ativos Ativos */}
      <div className="mt-6">
        <label className="block text-sm font-semibold text-cyan-400 mb-2">
          Ativos Ativos
        </label>
        <div className="flex flex-wrap gap-2">
          {['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'NZDUSD'].map((asset) => (
            <button
              key={asset}
              onClick={() => {
                const newAssets = config.active_assets.includes(asset)
                  ? config.active_assets.filter(a => a !== asset)
                  : [...config.active_assets, asset];
                handleChange('active_assets', newAssets);
              }}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                config.active_assets.includes(asset)
                  ? 'bg-cyan-500 text-white border-2 border-cyan-400'
                  : 'bg-gray-800 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
              }`}
            >
              {asset}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategyConfig;