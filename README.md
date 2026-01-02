# VFSS Quantum Core - Sistema de Trading Automatizado v4.0.0

Sistema completo de trading automatizado com análise técnica avançada, IA para previsão de mercado, gerenciamento de risco e interface web em tempo real.

## 🚀 Características Principais

### Backend (Python)
- ✅ **Análise Técnica Avançada**: RSI, MACD, Bollinger Bands, Médias Móveis, Volume
- ✅ **Detecção de Padrões**: Doji, Hammer, Shooting Star, Engulfing, Three Soldiers/Crows
- ✅ **Auto Trading**: Execução automática de trades baseada em sinais
- ✅ **Gerenciamento de Risco**: Stop Loss, Take Profit, limites diários
- ✅ **IA para Previsão**: Machine Learning com Random Forest
- ✅ **Backtesting**: Teste de estratégias com dados históricos
- ✅ **WebSocket**: Comunicação em tempo real com frontend
- ✅ **Integração IQ Option**: Conexão com corretora

### Frontend (React + TypeScript)
- ✅ **Painel de Controle do Robô**: Iniciar/parar, configurar estratégias
- ✅ **Sinais em Tempo Real**: Visualização de sinais de compra/venda
- ✅ **Histórico de Trades**: Registro completo de operações
- ✅ **Métricas de Performance**: Win rate, profit factor, drawdown
- ✅ **Configuração de Estratégia**: Ajuste de parâmetros em tempo real
- ✅ **Backtesting Interface**: Teste de estratégias com dados históricos
- ✅ **Dashboard Cyberpunk**: Interface futurista com animações

## 📁 Estrutura do Projeto

```
/workspace
├── backend/
│   ├── core/
│   │   ├── config.py              # Configurações centralizadas
│   │   ├── engine.py              # Motor principal (versão antiga)
│   │   ├── updated_engine.py      # Motor atualizado com auto-trading
│   │   └── state_manager.py       # Gerenciamento de estado
│   ├── services/
│   │   ├── iq_option_service.py   # Integração IQ Option
│   │   ├── technical_analysis.py  # Análise técnica avançada
│   │   ├── risk_manager.py        # Gerenciamento de risco
│   │   ├── auto_trader.py         # Sistema de auto-trading
│   │   ├── ai_predictor.py        # IA para previsão de mercado
│   │   ├── backtester.py          # Sistema de backtesting
│   │   ├── websocket_server.py    # Servidor WebSocket
│   │   ├── screen_capture.py      # Captura de tela
│   │   └── metrics_collector.py   # Coleta de métricas
│   ├── data/
│   │   └── models/                # Modelos de IA treinados
│   ├── requirements.txt           # Dependências Python
│   └── main.py                    # Entry point
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx          # Dashboard principal
│   │   ├── RobotControl.tsx       # Controle do robô
│   │   ├── RealTimeSignals.tsx    # Sinais em tempo real
│   │   ├── TradeHistory.tsx       # Histórico de trades
│   │   ├── StrategyConfig.tsx     # Configuração de estratégia
│   │   ├── PerformanceMetrics.tsx # Métricas de performance
│   │   ├── BacktestPanel.tsx      # Painel de backtesting
│   │   └── ...                    # Outros componentes
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   └── App.tsx                    # Componente principal
└── package.json                   # Dependências frontend
```

## 🛠️ Instalação

### 1. Backend (Python)

```bash
cd backend

# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais IQ Option
```

### 2. Frontend (React)

```bash
# Na raiz do projeto
pnpm install
```

## ⚙️ Configuração

### Backend (.env)

```env
# IQ Option
IQ_OPTION_EMAIL=seu_email@example.com
IQ_OPTION_PASSWORD=sua_senha
BALANCE_TYPE=PRACTICE  # ou REAL

# Server
HOST=0.0.0.0
PORT=8765

# Trading
AUTO_RECONNECT=True
MAX_RECONNECT_ATTEMPTS=5
```

### Parâmetros do Robô

Configure no frontend ou diretamente no código:

- **Modo**: SIMULATION (paper trading) ou REAL
- **Ativos**: EURUSD, GBPUSD, USDJPY, etc.
- **Timeframe**: 60 segundos (1 minuto)
- **Confiança Mínima**: 70% (ajustável)
- **Tamanho da Posição**: 2% do capital
- **Stop Loss**: 2%
- **Take Profit**: 4%
- **Limite Diário de Perda**: 5%
- **Máximo de Trades Diários**: 20

## 🚀 Execução

### 1. Iniciar Backend

```bash
cd backend
python main.py
```

Ou para usar o motor atualizado:

```bash
cd backend
python -c "from core.updated_engine import main; import asyncio; asyncio.run(main())"
```

### 2. Iniciar Frontend

```bash
pnpm run dev
```

Acesse: `http://localhost:5173`

## 📊 Como Usar

### 1. Dashboard Principal
- Visualize métricas do sistema em tempo real
- Monitore saldo, lucro, CPU, RAM
- Acompanhe logs no terminal

### 2. Auto Trading Robot
- **Iniciar Robô**: Clique em "INICIAR ROBÔ"
- **Modo**: Escolha SIMULATION para testar sem risco
- **Configurar**: Ajuste parâmetros na seção "Configuração de Estratégia"
- **Monitorar**: Veja sinais em tempo real e histórico de trades

### 3. Backtesting
- Selecione ativo e período
- Execute backtest para testar estratégia
- Analise métricas: win rate, sharpe ratio, drawdown

## 🤖 Sistema de Auto-Trading

### Fluxo de Operação

1. **Análise de Mercado**
   - Coleta dados históricos (candles)
   - Calcula indicadores técnicos
   - Detecta padrões de candlestick

2. **Geração de Sinais**
   - Sistema de pontuação (buy/sell)
   - Cálculo de confiança (0-100%)
   - Validação com múltiplos indicadores

3. **Gestão de Risco**
   - Verifica limites diários
   - Calcula tamanho da posição
   - Define stop loss e take profit

4. **Execução**
   - Abre posição se sinal válido
   - Monitora posições abertas
   - Fecha automaticamente em SL/TP

### Indicadores Utilizados

- **RSI**: Sobrecompra/sobrevenda
- **MACD**: Momentum e tendência
- **Bollinger Bands**: Volatilidade
- **Médias Móveis**: Tendência (20, 50, 200)
- **Volume**: Confirmação de movimento

### Padrões de Candlestick

- Doji, Hammer, Shooting Star
- Bullish/Bearish Engulfing
- Three White Soldiers / Three Black Crows

## 🧠 IA para Previsão

### Machine Learning

O sistema usa Random Forest para prever movimentos:

```python
# Treinar IA (executar uma vez)
await ai_predictor.generate_training_data(iq_service, technical_analysis, ['EURUSD', 'GBPUSD'])
await ai_predictor.train(training_data)

# Fazer previsão
prediction = await ai_predictor.predict(prices, volumes, indicators)
# Retorna: {"signal": "BUY", "confidence": 85.5, "method": "RANDOM_FOREST"}
```

### Features Utilizadas

- Preços (atual, médias, volatilidade)
- Volume (atual, média, ratio)
- Indicadores técnicos (RSI, MACD, BB, MAs)
- Retornos históricos

## 📈 Métricas de Performance

- **Win Rate**: % de trades vencedores
- **Profit Factor**: Razão lucro/perda
- **Sharpe Ratio**: Retorno ajustado ao risco
- **Max Drawdown**: Maior queda do capital
- **Avg Profit/Loss**: Média por trade

## 🔒 Segurança

- Credenciais em variáveis de ambiente
- Modo SIMULATION para testes sem risco
- Limites de perda diária
- Stop loss automático
- Validação de sinais com múltiplos indicadores

## 🐛 Troubleshooting

### Backend não conecta à IQ Option
- Verifique credenciais no `.env`
- Teste login manual no site da IQ Option
- Verifique se a conta está ativa

### Frontend não recebe dados
- Verifique se o backend está rodando
- Confirme porta WebSocket (8765)
- Veja logs no console do navegador

### Robô não executa trades
- Verifique se está em modo SIMULATION ou REAL
- Confirme que a confiança mínima não está muito alta
- Veja logs no terminal do backend

## 📝 Comandos WebSocket

O frontend pode enviar comandos ao backend:

```javascript
// Iniciar robô
{ command: 'start_robot', data: { mode: 'SIMULATION' } }

// Parar robô
{ command: 'stop_robot', data: {} }

// Obter status
{ command: 'get_robot_status', data: {} }

// Atualizar configuração
{ command: 'update_robot_config', data: { config: {...} } }

// Analisar ativo
{ command: 'analyze_asset', data: { asset: 'EURUSD' } }

// Executar backtest
{ command: 'run_backtest', data: { asset: 'EURUSD', periods: 1000 } }

// Treinar IA
{ command: 'train_ai', data: { assets: ['EURUSD', 'GBPUSD'] } }
```

## 🎨 Customização

### Ajustar Estratégia

Edite `backend/services/auto_trader.py`:

```python
# Mudar confiança mínima
self.min_confidence = 80.0

# Adicionar mais ativos
self.active_assets = ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD"]

# Ajustar timeframe
self.timeframe = 300  # 5 minutos
```

### Customizar Interface

Edite componentes em `src/components/`:
- Cores em Tailwind CSS
- Layout e grid
- Animações com Framer Motion

## 📚 Documentação Adicional

- [IQ Option API](https://github.com/Lu-Yi-Hsun/iqoptionapi)
- [Technical Analysis](https://www.investopedia.com/terms/t/technicalanalysis.asp)
- [Risk Management](https://www.investopedia.com/terms/r/riskmanagement.asp)

## ⚠️ Aviso Legal

Este sistema é fornecido apenas para fins educacionais. Trading envolve risco de perda de capital. Use por sua conta e risco. Sempre teste em modo SIMULATION antes de usar dinheiro real.

## 🤝 Contribuições

Desenvolvido para o projeto MGX (MetaGPTX).

## 📄 Licença

Todos os direitos reservados.