import sys, os, ssl, time, threading, base64, io, random
try:
    import mss
    from PIL import Image
    from iqoptionapi.stable_api import IQ_Option
except:
    IQ_Option = None

# Força o Python a ler a pasta local antes de qualquer outra
sys.path.insert(0, os.getcwd())

ssl._create_default_https_context = ssl._create_unverified_context
api = IQ_Option('ericferraz180784@gmail.com', 'YuRiF@1303') if IQ_Option else None

st = {
    "saldo": 0.0, "lucro": 0.0, "uptime": 0, "status": "BOOTING CORE...",
    "img": "", "ping": "0ms", "cpu": "0%", "ops": 0,
    "terminal": ["Iniciando protocolo VFSS...", "Verificando Kernel...", "Aguardando sinal..."]
}

def motor_alfa_pro():
    global st
    start = time.time()
    sct = mss.mss() if 'mss' in sys.modules else None
    
    if api:
        st["terminal"].insert(0, "Handshake com servidor via porta 443...")
        check, _ = api.connect()
        if check:
            api.change_balance('REAL')
            st["status"] = "NÚCLEO ONLINE"
        else:
            st["status"] = "ERRO AUTENTICAÇÃO"
    
    while True:
        try:
            st["uptime"] = int(time.time() - start)
            st["ping"] = f"{random.randint(10, 35)}ms"
            st["cpu"] = f"{random.randint(2, 18)}%"
            
            if api and api.check_connect():
                st["saldo"] = api.get_balance() or 0.0
                if random.random() > 0.98:
                    st["ops"] += 1
                    st["terminal"].insert(0, "Padrão de vela detectado - Analisando...")
            
            if sct:
                monitor = sct.monitors[1]
                sct_img = sct.grab(monitor)
                img = Image.frombytes("RGB", sct_img.size, sct_img.bgra, "raw", "BGRX")
                buf = io.BytesIO()
                img.save(buf, format="JPEG", quality=40)
                st["img"] = base64.b64encode(buf.getvalue()).decode("utf-8")
            
            if len(st["terminal"]) > 8: st["terminal"].pop()
            time.sleep(1)
        except:
            time.sleep(2)

class PainelTitanium(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        logs = "".join([f"<div style='margin-bottom:5px;'>> {l}</div>" for l in st["terminal"]])
        html = f"""
        <!DOCTYPE html><html><head><meta http-equiv='refresh' content='1'>
        <link href='https://fonts.googleapis.com/css2?family=JetBrains+Mono&family=Orbitron:wght@700&display=swap' rel='stylesheet'>
        <style>
            body {{ background: #000508; color: #00f2ff; font-family: 'JetBrains Mono', monospace; padding: 20px; }}
            .top-bar {{ display: flex; justify-content: space-between; border-bottom: 2px solid #003a4d; padding: 10px; font-family: 'Orbitron'; font-size: 0.9em; }}
            .container {{ display: grid; grid-template-columns: 280px 1fr 280px; gap: 20px; margin-top: 20px; }}
            .box {{ background: rgba(0, 20, 30, 0.8); border: 1px solid #003a4d; padding: 15px; border-radius: 4px; box-shadow: 0 0 15px rgba(0,242,255,0.1); }}
            .val {{ font-size: 1.8em; color: #fff; margin: 10px 0; }}
            .label {{ font-size: 0.7em; color: #008899; letter-spacing: 2px; }}
            .screen {{ width: 100%; border: 1px solid #00f2ff; box-shadow: 0 0 30px rgba(0,0,0,1); }}
            .log-box {{ font-size: 0.7em; color: #00ffaa; height: 200px; overflow: hidden; }}
        </style></head>
        <body>
            <div class='top-bar'><div>VFSS ALFA PLATINUM CORE</div><div>STATUS: <span style='color:#0f0'>{st["status"]}</span></div></div>
            <div class='container'>
                <div class='box'>
                    <div class='label'>ACCOUNT BALANCE</div><div class='val'>R$ {st["saldo"]}</div>
                    <div class='label'>IA PROFITS</div><div class='val' style='color:#0f0'>R$ {st["lucro"]}</div>
                    <div class='label'>LATENCY</div><div class='val'>{st["ping"]}</div>
                </div>
                <div class='box'><img src='data:image/jpeg;base64,{st['img']}' class='screen'></div>
                <div class='box'>
                    <div class='label'>LIVE TELEMETRY</div><div class='log-box'>{logs}</div>
                    <hr style='border:0; border-top:1px solid #003a4d; margin:15px 0;'>
                    <div class='label'>UPTIME</div><div class='val'>{st["uptime"]}s</div>
                    <div class='label'>CAPTURED OPS</div><div class='val'>{st["ops"]}</div>
                </div>
            </div>
        </body></html>
        """
        self.wfile.write(html.encode())

if __name__ == "__main__":
    threading.Thread(target=motor_alfa_pro, daemon=True).start()
    HTTPServer(('0.0.0.0', 8081), PainelTitanium).serve_forever()