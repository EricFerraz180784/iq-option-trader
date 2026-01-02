# IQ Option Automated Trading System

## 📦 Como Reconstruir o Projeto

Este projeto foi dividido em **5 arquivos** para upload no GitHub (limite de 25 MB por arquivo).

### Arquivos do Repositório:

```
✅ part1-backend.tar.gz           → 29 KB  (Backend Python)
✅ part2-src.tar.gz               → 17 KB  (Frontend React/TypeScript)
✅ part3-config.tar.gz            → 49 KB  (Arquivos de configuração)
✅ part4-uploads.tar.gz.partaa    → 20 MB  (Screenshots - parte 1)
✅ part4-uploads.tar.gz.partab    → 2.6 MB (Screenshots - parte 2)
```

---

## 🔧 Instruções para Reconstruir:

### 1. Clone o repositório:
```bash
git clone https://github.com/EricFerraz180784/iq-option-trader.git
cd iq-option-trader
```

### 2. Extraia os arquivos principais:
```bash
tar -xzf part1-backend.tar.gz
tar -xzf part2-src.tar.gz
tar -xzf part3-config.tar.gz
```

### 3. Reconstrua a pasta uploads:
```bash
cat part4-uploads.tar.gz.part* > part4-uploads.tar.gz
tar -xzf part4-uploads.tar.gz
```

### 4. Instale as dependências:

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

---

## 🚀 Como Executar:

### Frontend (React + Vite):
```bash
npm run dev
```
Acesse: http://localhost:5173

### Backend (FastAPI):
```bash
cd backend
python main.py
```
API disponível em: http://localhost:8000

---

## 📋 Configuração:

1. Configure suas credenciais da IQ Option no arquivo `backend/.env`
2. Ajuste as configurações de trading conforme necessário
3. Execute o backend antes do frontend

---

## 🛠️ Tecnologias:

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Python, FastAPI
- **Trading:** IQ Option API

---

## 📝 Notas:

- A pasta `uploads/` contém screenshots de desenvolvimento (27 MB total)
- Você pode deletar a pasta `uploads/` se não precisar dos screenshots
- Todos os arquivos de código estão em `part1`, `part2` e `part3`

---

## 📧 Suporte:

Para dúvidas ou problemas, abra uma issue no repositório.
