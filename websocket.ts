import { SystemState } from '../types';
import { getRandomTerminalMessage } from './mockData';

export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private listeners: ((data: Partial<SystemState>) => void)[] = [];

  connect(url: string = 'ws://localhost:8765'): void {
    try {
      this.ws = new WebSocket(url);
      
      this.ws.onopen = () => {
        console.log('WebSocket conectado');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.notifyListeners(data);
        } catch (error) {
          console.error('Erro ao parsear mensagem WebSocket:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('Erro WebSocket:', error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket desconectado');
        this.attemptReconnect(url);
      };
    } catch (error) {
      console.error('Erro ao conectar WebSocket:', error);
      this.attemptReconnect(url);
    }
  }

  private attemptReconnect(url: string): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Tentando reconectar... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      setTimeout(() => this.connect(url), this.reconnectDelay);
    }
  }

  subscribe(callback: (data: Partial<SystemState>) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners(data: Partial<SystemState>): void {
    this.listeners.forEach(listener => listener(data));
  }

  send(data: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Simulador de dados em tempo real para demonstração
export class MockDataSimulator {
  private interval: number | null = null;
  private startTime = Date.now();
  private callbacks: ((data: Partial<SystemState>) => void)[] = [];

  start(): void {
    this.interval = window.setInterval(() => {
      const uptime = Math.floor((Date.now() - this.startTime) / 1000);
      const data: Partial<SystemState> = {
        uptime,
        ping: `${Math.floor(Math.random() * 25) + 10}ms`,
        cpu: `${Math.floor(Math.random() * 15) + 5}%`,
        ram: `${Math.floor(Math.random() * 20) + 30}%`,
        saldo: 10000 + Math.random() * 5000,
        lucro: Math.random() * 2000 - 500,
        ops: Math.floor(Math.random() * 100)
      };

      // Adicionar mensagem ao terminal ocasionalmente
      if (Math.random() > 0.7) {
        data.terminal = [getRandomTerminalMessage()];
      }

      this.callbacks.forEach(cb => cb(data));
    }, 1000);
  }

  subscribe(callback: (data: Partial<SystemState>) => void): () => void {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  stop(): void {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}