import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import RobotControl from './components/RobotControl';
import RealTimeSignals from './components/RealTimeSignals';
import TradeHistory from './components/TradeHistory';
import StrategyConfig from './components/StrategyConfig';
import PerformanceMetrics from './components/PerformanceMetrics';
import BacktestPanel from './components/BacktestPanel';
import { SystemState } from './types';
import { initialSystemState } from './services/mockData';
import { MockDataSimulator } from './services/websocket';
import './App.css';

const App: React.FC = () => {
  const [state, setState] = useState<SystemState>(initialSystemState);
  const [simulator] = useState(() => new MockDataSimulator());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'robot' | 'backtest'>('dashboard');
  
  // Robot state
  const [robotStatus, setRobotStatus] = useState<any>(null);
  const [signals, setSignals] = useState<any>({});
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    // Atualizar status após boot
    setTimeout(() => {
      setState(prev => ({ ...prev, status: 'NÚCLEO ONLINE' }));
    }, 3000);

    // Iniciar simulador de dados
    const unsubscribe = simulator.subscribe((data) => {
      setState(prev => {
        const newState = { ...prev, ...data };
        
        // Adicionar novas mensagens ao terminal
        if (data.terminal && data.terminal.length > 0) {
          newState.terminal = [...data.terminal, ...prev.terminal].slice(0, 20);
        }
        
        return newState;
      });
    });

    simulator.start();

    // Simular dados do robô
    const robotInterval = setInterval(() => {
      // Simular status do robô
      setRobotStatus({
        is_running: Math.random() > 0.5,
        mode: 'SIMULATION',
        active_assets: ['EURUSD', 'GBPUSD', 'USDJPY'],
        timeframe: 60,
        min_confidence: 70,
        statistics: {
          total_trades: Math.floor(Math.random() * 100) + 50,
          win_rate: Math.random() * 40 + 40,
          daily_pnl: (Math.random() - 0.5) * 500,
          daily_trades: Math.floor(Math.random() * 20),
          open_positions: Math.floor(Math.random() * 5),
          winning_trades: Math.floor(Math.random() * 60) + 30,
          losing_trades: Math.floor(Math.random() * 40) + 20,
          avg_profit: Math.random() * 50 + 20,
          avg_loss: -(Math.random() * 30 + 10),
          profit_factor: Math.random() * 2 + 0.5,
          max_daily_loss_pct: 5,
          max_daily_trades: 20
        }
      });

      // Simular sinais
      if (Math.random() > 0.7) {
        const assets = ['EURUSD', 'GBPUSD', 'USDJPY'];
        const asset = assets[Math.floor(Math.random() * assets.length)];
        const signalType = Math.random() > 0.5 ? 'BUY' : 'SELL';
        
        setSignals((prev: any) => ({
          ...prev,
          [asset]: {
            signal: signalType,
            confidence: Math.random() * 40 + 50,
            indicators: {
              rsi: Math.random() * 100,
              macd: (Math.random() - 0.5) * 0.01,
              macd_signal: (Math.random() - 0.5) * 0.01,
              macd_histogram: (Math.random() - 0.5) * 0.005,
              bb_upper: 1.2 + Math.random() * 0.1,
              bb_middle: 1.15 + Math.random() * 0.05,
              bb_lower: 1.1 + Math.random() * 0.1,
              ma_20: 1.15 + Math.random() * 0.05,
              ma_50: 1.14 + Math.random() * 0.05,
              volume_ratio: Math.random() * 2 + 0.5
            },
            patterns: Math.random() > 0.7 ? ['DOJI', 'HAMMER'] : [],
            scores: {
              buy: Math.floor(Math.random() * 5),
              sell: Math.floor(Math.random() * 5)
            },
            timestamp: new Date().toISOString()
          }
        }));
      }

      // Simular trades
      if (Math.random() > 0.9) {
        const newTrade = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now(),
          type: Math.random() > 0.5 ? 'BUY' : 'SELL',
          asset: ['EURUSD', 'GBPUSD', 'USDJPY'][Math.floor(Math.random() * 3)],
          amount: Math.random() * 100 + 50,
          entry_price: 1.1 + Math.random() * 0.1,
          exit_price: 1.1 + Math.random() * 0.1,
          profit: (Math.random() - 0.5) * 50,
          status: 'COMPLETED' as const
        };
        
        setTrades(prev => [newTrade, ...prev].slice(0, 50));
      }
    }, 3000);

    return () => {
      unsubscribe();
      simulator.stop();
      clearInterval(robotInterval);
    };
  }, [simulator]);

  const handleCommand = async (command: string, data: any) => {
    console.log('Command:', command, data);
    // Aqui você implementaria a comunicação real com o backend via WebSocket
    return { success: true };
  };

  const handleSaveConfig = (config: any) => {
    console.log('Saving config:', config);
    handleCommand('update_robot_config', { config });
  };

  const handleRunBacktest = async (config: any) => {
    console.log('Running backtest:', config);
    // Simular resultado de backtest
    return {
      success: true,
      metrics: {
        total_trades: 150,
        winning_trades: 90,
        losing_trades: 60,
        win_rate: 60,
        total_return_pct: 25.5,
        profit_factor: 1.8,
        sharpe_ratio: 1.5,
        max_drawdown_pct: 12.3
      }
    };
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Tabs */}
      <div className="bg-gray-900 border-b border-cyan-500/30 px-6 py-4">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
              activeTab === 'dashboard'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Dashboard Principal
          </button>
          <button
            onClick={() => setActiveTab('robot')}
            className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
              activeTab === 'robot'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Auto Trading Robot
          </button>
          <button
            onClick={() => setActiveTab('backtest')}
            className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
              activeTab === 'backtest'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Backtesting
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'dashboard' && <Dashboard state={state} />}
        
        {activeTab === 'robot' && (
          <div className="space-y-6">
            <RobotControl onCommand={handleCommand} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RealTimeSignals signals={signals} />
              <PerformanceMetrics metrics={robotStatus?.statistics || null} />
            </div>
            
            <StrategyConfig onSave={handleSaveConfig} />
            
            <TradeHistory trades={trades} />
          </div>
        )}
        
        {activeTab === 'backtest' && (
          <BacktestPanel onRunBacktest={handleRunBacktest} />
        )}
      </div>
    </div>
  );
};

export default App;