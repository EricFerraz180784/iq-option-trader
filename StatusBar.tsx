import React from 'react';
import { Activity, Wifi, Cpu, HardDrive } from 'lucide-react';
import { SystemState } from '../types';
import { getStatusColor, formatTime } from '../utils/formatters';

interface StatusBarProps {
  state: SystemState;
}

const StatusBar: React.FC<StatusBarProps> = ({ state }) => {
  return (
    <div className="status-bar">
      <div className="status-left">
        <img 
          src="https://mgx-backend-cdn.metadl.com/generate/images/877416/2026-01-01/6b0f4664-6f15-40e2-ad7c-0d30364796cc.png" 
          alt="VFSS Logo" 
          className="logo"
        />
        <h1 className="title">VFSS QUANTUM CORE</h1>
        <span className="version">v3.0.0</span>
      </div>
      
      <div className="status-center">
        <div className="status-item">
          <Activity className="icon" size={16} />
          <span>STATUS:</span>
          <span 
            className="status-value" 
            style={{ color: getStatusColor(state.status) }}
          >
            {state.status}
          </span>
        </div>
      </div>

      <div className="status-right">
        <div className="metric-item">
          <Wifi className="icon" size={14} />
          <span>{state.ping}</span>
        </div>
        <div className="metric-item">
          <Cpu className="icon" size={14} />
          <span>{state.cpu}</span>
        </div>
        <div className="metric-item">
          <HardDrive className="icon" size={14} />
          <span>{state.ram}</span>
        </div>
        <div className="metric-item uptime">
          <span>UPTIME: {formatTime(state.uptime)}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;