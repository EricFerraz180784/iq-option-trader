import React from 'react';
import { SystemState } from '../types';
import StatusBar from './StatusBar';
import MetricsPanel from './MetricsPanel';
import LiveChart from './LiveChart';
import Terminal from './Terminal';
import ThreeBackground from './ThreeBackground';

interface DashboardProps {
  state: SystemState;
}

const Dashboard: React.FC<DashboardProps> = ({ state }) => {
  return (
    <div className="dashboard">
      <ThreeBackground />
      <div className="dashboard-content">
        <StatusBar state={state} />
        
        <div className="main-content">
          <MetricsPanel state={state} />
          
          <div className="dashboard-grid">
            <div className="chart-section">
              <LiveChart />
            </div>
            
            <div className="terminal-section">
              <Terminal logs={state.terminal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;