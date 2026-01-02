import React from 'react';
import { TrendingUp, DollarSign, Target, Activity } from 'lucide-react';
import { SystemState } from '../types';
import { formatCurrency, getProfitColor } from '../utils/formatters';
import { motion } from 'framer-motion';

interface MetricsPanelProps {
  state: SystemState;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ state }) => {
  const profitPercentage = state.saldo > 0 ? (state.lucro / state.saldo) * 100 : 0;

  const metrics = [
    {
      icon: DollarSign,
      label: 'SALDO DA CONTA',
      value: formatCurrency(state.saldo),
      color: '#00f2ff'
    },
    {
      icon: TrendingUp,
      label: 'LUCRO DA IA',
      value: formatCurrency(state.lucro),
      color: getProfitColor(state.lucro),
      percentage: profitPercentage
    },
    {
      icon: Target,
      label: 'OPERAÇÕES',
      value: state.ops.toString(),
      color: '#ffaa00'
    },
    {
      icon: Activity,
      label: 'WIN RATE',
      value: '73.5%',
      color: '#00ff88'
    }
  ];

  return (
    <div className="metrics-panel">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          className="metric-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="metric-header">
            <metric.icon className="metric-icon" size={20} style={{ color: metric.color }} />
            <span className="metric-label">{metric.label}</span>
          </div>
          <div className="metric-value" style={{ color: metric.color }}>
            {metric.value}
          </div>
          {metric.percentage !== undefined && (
            <div className="metric-percentage" style={{ color: getProfitColor(metric.percentage) }}>
              {metric.percentage >= 0 ? '+' : ''}{metric.percentage.toFixed(2)}%
            </div>
          )}
          <div className="metric-glow" style={{ backgroundColor: metric.color }}></div>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricsPanel;