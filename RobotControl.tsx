import React, { useState, useEffect } from 'react';
import { Play, Square, Settings, TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface RobotStatus {
  is_running: boolean;
  mode: string;
  active_assets: string[];
  timeframe: number;
  min_confidence: number;
  statistics: {
    total_trades: number;
    win_rate: number;
    daily_pnl: number;
    daily_trades: number;
    open_positions: number;
  };
}

interface RobotControlProps {
  onCommand: (command: string, data: any) => void;
}

const RobotControl: React.FC<RobotControlProps> = ({ onCommand }) => {
  const [status] = useState<RobotStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch status periodically
    const interval = setInterval(() => {
      onCommand('get_robot_status', {});
    }, 5000);

    return () => clearInterval(interval);
  }, [onCommand]);

  const handleStart = async () => {
    setLoading(true);
    await onCommand('start_robot', { mode: 'SIMULATION' });
    setLoading(false);
  };

  const handleStop = async () => {
    setLoading(true);
    await onCommand('stop_robot', {});
    setLoading(false);
  };

  const isRunning = status?.is_running || false;
  const stats = status?.statistics;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-lg p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Activity className="w-8 h-8 text-cyan-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">Auto Trading Robot</h2>
            <p className="text-sm text-cyan-400">
              Status: {isRunning ? 'ATIVO' : 'INATIVO'} | Modo: {status?.mode || 'N/A'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/50 disabled:opacity-50"
            >
              <Play className="w-5 h-5" />
              INICIAR ROBÔ
            </button>
          ) : (
            <button
              onClick={handleStop}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/50 disabled:opacity-50"
            >
              <Square className="w-5 h-5" />
              PARAR ROBÔ
            </button>
          )}
          
          <button className="flex items-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-cyan-400 font-bold rounded-lg transition-all duration-300 border border-cyan-500/30">
            <Settings className="w-5 h-5" />
            CONFIG
          </button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
            <div className="text-xs text-cyan-400 mb-1">Total Trades</div>
            <div className="text-2xl font-bold text-white">{stats.total_trades}</div>
          </div>
          
          <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
            <div className="text-xs text-cyan-400 mb-1">Win Rate</div>
            <div className={`text-2xl font-bold ${stats.win_rate >= 50 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.win_rate.toFixed(1)}%
            </div>
          </div>
          
          <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
            <div className="text-xs text-cyan-400 mb-1">P&L Diário</div>
            <div className={`text-2xl font-bold flex items-center gap-1 ${stats.daily_pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.daily_pnl >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              ${Math.abs(stats.daily_pnl).toFixed(2)}
            </div>
          </div>
          
          <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
            <div className="text-xs text-cyan-400 mb-1">Trades Hoje</div>
            <div className="text-2xl font-bold text-white">{stats.daily_trades}</div>
          </div>
          
          <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4">
            <div className="text-xs text-cyan-400 mb-1">Posições Abertas</div>
            <div className="text-2xl font-bold text-yellow-400">{stats.open_positions}</div>
          </div>
        </div>
      )}

      {status?.active_assets && (
        <div className="mt-4 p-4 bg-gray-800/30 border border-cyan-500/20 rounded-lg">
          <div className="text-sm text-cyan-400 mb-2">Ativos Ativos:</div>
          <div className="flex flex-wrap gap-2">
            {status.active_assets.map((asset) => (
              <span
                key={asset}
                className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-xs font-mono text-cyan-300"
              >
                {asset}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RobotControl;