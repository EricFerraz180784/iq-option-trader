# 🚀 Guia de Deploy - VFSS Quantum Core

Este guia detalha como fazer deploy do sistema completo em produção.

## 📋 Pré-requisitos

- Servidor Linux (Ubuntu 20.04+ recomendado)
- Node.js 18+ e pnpm
- Python 3.8+
- Nginx (para servir frontend)
- PM2 ou systemd (para gerenciar processos)
- SSL/TLS certificate (Let's Encrypt recomendado)

## 🌐 Deploy do Frontend

### 1. Build de Produção

```bash
# No diretório do projeto
pnpm install
pnpm run build
```

### 2. Configurar Nginx

Crie o arquivo `/etc/nginx/sites-available/vfss`:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    
    # Redirecionar para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seu-dominio.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    # Root directory
    root /var/www/vfss/dist;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # WebSocket proxy
    location /ws {
        proxy_pass http://localhost:8765;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400;
    }
}
```

### 3. Ativar Site

```bash
# Criar symlink
sudo ln -s /etc/nginx/sites-available/vfss /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Recarregar Nginx
sudo systemctl reload nginx
```

### 4. Copiar Arquivos

```bash
# Criar diretório
sudo mkdir -p /var/www/vfss

# Copiar build
sudo cp -r dist/* /var/www/vfss/

# Ajustar permissões
sudo chown -R www-data:www-data /var/www/vfss
```

## 🐍 Deploy do Backend

### 1. Preparar Ambiente

```bash
# Criar usuário dedicado
sudo useradd -m -s /bin/bash vfss

# Criar diretórios
sudo mkdir -p /opt/vfss
sudo chown vfss:vfss /opt/vfss

# Copiar código
sudo cp -r backend/* /opt/vfss/
```

### 2. Configurar Ambiente Virtual

```bash
# Mudar para usuário vfss
sudo su - vfss

# Criar venv
cd /opt/vfss
python3 -m venv venv
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt
```

### 3. Configurar Variáveis de Ambiente

Crie `/opt/vfss/.env`:

```env
# IQ Option
IQ_OPTION_EMAIL=seu_email@exemplo.com
IQ_OPTION_PASSWORD=sua_senha_segura

# Server
HOST=0.0.0.0
PORT=8765
ENVIRONMENT=production
DEBUG=False

# Logging
LOG_LEVEL=INFO
LOG_FILE=/var/log/vfss/vfss.log

# Security
SECRET_KEY=gere_uma_chave_secreta_forte_aqui
ENCRYPTION_KEY=gere_uma_chave_de_criptografia_aqui

# Trading
BALANCE_TYPE=REAL
AUTO_RECONNECT=True
MAX_RECONNECT_ATTEMPTS=10
```

### 4. Criar Serviço Systemd

Crie `/etc/systemd/system/vfss.service`:

```ini
[Unit]
Description=VFSS Quantum Core Trading System
After=network.target

[Service]
Type=simple
User=vfss
Group=vfss
WorkingDirectory=/opt/vfss
Environment="PATH=/opt/vfss/venv/bin"
EnvironmentFile=/opt/vfss/.env
ExecStart=/opt/vfss/venv/bin/python main.py
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

# Security
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/log/vfss /opt/vfss/data

[Install]
WantedBy=multi-user.target
```

### 5. Iniciar Serviço

```bash
# Criar diretório de logs
sudo mkdir -p /var/log/vfss
sudo chown vfss:vfss /var/log/vfss

# Recarregar systemd
sudo systemctl daemon-reload

# Habilitar e iniciar serviço
sudo systemctl enable vfss
sudo systemctl start vfss

# Verificar status
sudo systemctl status vfss

# Ver logs
sudo journalctl -u vfss -f
```

## 🔒 Segurança

### 1. Firewall

```bash
# Permitir apenas portas necessárias
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # SSH

# Bloquear porta WebSocket direta (usar apenas via Nginx)
sudo ufw deny 8765/tcp

# Ativar firewall
sudo ufw enable
```

### 2. Fail2Ban

```bash
# Instalar
sudo apt install fail2ban

# Configurar para proteger SSH e Nginx
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 3. SSL/TLS

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d seu-dominio.com

# Renovação automática já está configurada
```

## 📊 Monitoramento

### 1. Logs

```bash
# Logs do backend
sudo journalctl -u vfss -f

# Logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Logs da aplicação
sudo tail -f /var/log/vfss/vfss.log
```

### 2. Métricas do Sistema

```bash
# CPU e memória
htop

# Processos Python
ps aux | grep python

# Conexões de rede
sudo netstat -tulpn | grep LISTEN
```

### 3. Monitoramento Avançado (Opcional)

Considere usar:
- **Prometheus + Grafana**: Métricas e dashboards
- **ELK Stack**: Agregação e análise de logs
- **Sentry**: Rastreamento de erros
- **UptimeRobot**: Monitoramento de uptime

## 🔄 Atualizações

### Frontend

```bash
# Build nova versão
pnpm run build

# Backup da versão atual
sudo mv /var/www/vfss /var/www/vfss.backup

# Deploy nova versão
sudo cp -r dist /var/www/vfss
sudo chown -R www-data:www-data /var/www/vfss

# Recarregar Nginx
sudo systemctl reload nginx
```

### Backend

```bash
# Parar serviço
sudo systemctl stop vfss

# Backup
sudo cp -r /opt/vfss /opt/vfss.backup

# Atualizar código
sudo cp -r backend/* /opt/vfss/

# Atualizar dependências
sudo su - vfss
cd /opt/vfss
source venv/bin/activate
pip install -r requirements.txt

# Reiniciar serviço
sudo systemctl start vfss
sudo systemctl status vfss
```

## 🔙 Backup e Recuperação

### Backup Automático

Crie script `/opt/vfss/backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/backup/vfss"
DATE=$(date +%Y%m%d_%H%M%S)

# Criar diretório de backup
mkdir -p $BACKUP_DIR

# Backup do código
tar -czf $BACKUP_DIR/code_$DATE.tar.gz /opt/vfss

# Backup dos logs
tar -czf $BACKUP_DIR/logs_$DATE.tar.gz /var/log/vfss

# Backup da configuração
cp /opt/vfss/.env $BACKUP_DIR/env_$DATE

# Manter apenas últimos 7 dias
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup concluído: $DATE"
```

Configure cron:

```bash
# Editar crontab
sudo crontab -e

# Adicionar backup diário às 3h
0 3 * * * /opt/vfss/backup.sh >> /var/log/vfss/backup.log 2>&1
```

## 🚨 Troubleshooting

### Backend não inicia

```bash
# Verificar logs
sudo journalctl -u vfss -n 50

# Verificar permissões
ls -la /opt/vfss

# Verificar variáveis de ambiente
sudo -u vfss cat /opt/vfss/.env

# Testar manualmente
sudo su - vfss
cd /opt/vfss
source venv/bin/activate
python main.py
```

### WebSocket não conecta

```bash
# Verificar se backend está escutando
sudo netstat -tulpn | grep 8765

# Testar conexão local
wscat -c ws://localhost:8765

# Verificar Nginx proxy
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

### Alto uso de CPU/RAM

```bash
# Identificar processo
top
htop

# Verificar logs para erros
sudo journalctl -u vfss | grep ERROR

# Ajustar intervalos no .env
DATA_UPDATE_INTERVAL=2
SCREEN_CAPTURE_INTERVAL=5
```

## 📱 Deploy em Cloud

### AWS

1. **EC2**: Use t3.medium ou superior
2. **RDS**: Para banco de dados (se adicionar)
3. **S3**: Para backups
4. **CloudWatch**: Para monitoramento
5. **ALB**: Para load balancing

### DigitalOcean

1. **Droplet**: 2GB RAM mínimo
2. **Spaces**: Para backups
3. **Monitoring**: Ativar monitoramento
4. **Firewall**: Configurar via painel

### Docker (Opcional)

Crie `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

CMD ["python", "main.py"]
```

## 📞 Suporte

Para problemas de deploy:
1. Verifique logs do sistema
2. Consulte documentação
3. Abra issue no repositório

---

**VFSS Quantum Core** - Deploy Guide v3.0.0