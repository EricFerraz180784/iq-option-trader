import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CandlestickData } from '../types';
import { generateMockCandlestick } from '../services/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LiveChart: React.FC = () => {
  const [candleData, setCandleData] = useState<CandlestickData[]>([]);
  const maxDataPoints = 50;

  useEffect(() => {
    // Inicializar com dados
    const initialData: CandlestickData[] = [];
    for (let i = 0; i < 30; i++) {
      initialData.push(generateMockCandlestick());
    }
    setCandleData(initialData);

    // Atualizar dados periodicamente
    const interval = setInterval(() => {
      setCandleData(prev => {
        const newData = [...prev, generateMockCandlestick()];
        return newData.slice(-maxDataPoints);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: candleData.map((_, i) => i.toString()),
    datasets: [
      {
        label: 'Preço',
        data: candleData.map(d => d.close),
        borderColor: '#00f2ff',
        backgroundColor: 'rgba(0, 242, 255, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#00f2ff',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2
      },
      {
        label: 'Máxima',
        data: candleData.map(d => d.high),
        borderColor: '#00ff88',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        tension: 0.4
      },
      {
        label: 'Mínima',
        data: candleData.map(d => d.low),
        borderColor: '#ff0055',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#00f2ff',
          font: {
            family: 'JetBrains Mono',
            size: 11
          },
          usePointStyle: true,
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 10, 20, 0.9)',
        titleColor: '#00f2ff',
        bodyColor: '#ffffff',
        borderColor: '#00f2ff',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y.toFixed(2);
            return `${label}: R$ ${value}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(0, 242, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#00f2ff',
          font: {
            family: 'JetBrains Mono',
            size: 10
          },
          maxTicksLimit: 10
        }
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(0, 242, 255, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#00f2ff',
          font: {
            family: 'JetBrains Mono',
            size: 10
          },
          callback: function(value: any) {
            return 'R$ ' + value.toFixed(0);
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    },
    animation: {
      duration: 750,
      easing: 'easeInOutQuart' as const
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <span className="chart-title">GRÁFICO DE PREÇOS EM TEMPO REAL</span>
        <div className="chart-indicators">
          <span className="indicator active">1M</span>
          <span className="indicator">5M</span>
          <span className="indicator">15M</span>
          <span className="indicator">1H</span>
        </div>
      </div>
      <div className="chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LiveChart;