export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatNumber = (value: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${formatNumber(value, 2)}%`;
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    'NÚCLEO ONLINE': '#00ff88',
    'BOOTING CORE...': '#ffaa00',
    'ERRO AUTENTICAÇÃO': '#ff0055',
    'CONECTANDO...': '#00f2ff',
    'STANDBY': '#888888'
  };
  return statusMap[status] || '#00f2ff';
};

export const getProfitColor = (value: number): string => {
  if (value > 0) return '#00ff88';
  if (value < 0) return '#ff0055';
  return '#ffffff';
};