<center>
# SASK-YT-Client-on-your-server
あなたのサーバー環境下でYTクライアントを実行できます!
<left>
# ・起動方法
①Terminalにて下記を実行。
sudo apt update && sudo apt upgrade -y
↓
sudo apt install nodejs git -y
↓
sudo apt install cloudflared
↓
mkdir sask && git clone https://github.com/SASK-kun/SASK-YT-Client-on-your-server.git
↓
cd && cd sask/sask-yt-home && npm install && node server.js
↓
cloudflared tunnel --url http://localhost:3000


ログ内に出てくる〇〇〇〇〇〇〇〇.trycloudflare.comのリンクを探してコピーする。
