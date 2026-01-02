import React from 'react';
import { History, TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react';

interface Trade {
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

interface TradeHistoryProps {
  trades: Trade[];
}

const TradeHistory: React.FC<TradeHistoryProps> = ({ trades }) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-400 bg-green-500/20 border-green-500/40';
      case 'PENDING':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/40';
      case 'FAILED':
        return 'text-red-400 bg-red-500/20 border-red-500/40';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/40';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-lg p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <History className="w-7 h-7 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">Histórico de Trades</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/30">
              <th className="text-left py-3 px-2 text-sm font-semibold text-cyan-400">Data/Hora</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-cyan-400">Ativo</th>
              <th className="text-left py-3 px-2 text-sm font-semibold text-cyan-400">Tipo</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-cyan-400">Entrada</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-cyan-400">Saída</th>
              <th className="text-right py-3 px-2 text-sm font-semibold text-cyan-400">P&L</th>
              <th className="text-center py-3 px-2 text-sm font-semibold text-cyan-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {trades.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Nenhum trade executado ainda</p>
                </td>
              </tr>
            ) : (
              trades.slice(0, 20).map((trade) => (
                <tr
                  key={trade.id}
                  className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="py-3 px-2 text-sm text-gray-300 font-mono">
                    {formatDate(trade.timestamp)}
                  </td>
                  <td className="py-3 px-2 text-sm font-bold text-white">
                    {trade.asset}
                  </td>
                  <td className="py-3 px-2">
                    <span className={`flex items-center gap-1 text-sm font-bold ${trade.type === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.type === 'BUY' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {trade.type}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right text-sm font-mono text-gray-300">
                    {trade.entry_price.toFixed(5)}
                  </td>
                  <td className="py-3 px-2 text-right text-sm font-mono text-gray-300">
                    {trade.exit_price ? trade.exit_price.toFixed(5) : '-'}
                  </td>
                  <td className="py-3 px-2 text-right">
                    {trade.profit !== undefined ? (
                      <span className={`flex items-center justify-end gap-1 text-sm font-bold ${trade.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        <DollarSign className="w-4 h-4" />
                        {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold border ${getStatusColor(trade.status)}`}>
                      {trade.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeHistory;