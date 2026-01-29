# 📺 SASK-YT-Client-on-your-server


**あなたのサーバー環境下で自分専用のYouTubeクライアントを実行・公開しましょう！**

---

## 🛠 準備するもの
- Linuxサーバー (Ubuntu推奨)
- インターネット接続環境

---

## 🚀 起動方法 (Quick Start)

ターミナルを開き、以下のコマンドを順番に実行してください。

### 1. システムの更新と必須ツールのインストール
まずは環境を最新の状態にし、Node.js、Git、Cloudflaredをインストールします。

```bash
# パッケージリストの更新とアップグレード
sudo apt update && sudo apt upgrade -y

# Node.js と Git のインストール
sudo apt install nodejs git -y

# Cloudflared (外部公開用) のインストール
sudo apt install cloudflared -y

# Githubからコピー
git clone https://github.com/SASK-kun/SASK-YT-Client-on-your-server.git

#　コピーしたディレクトリに移動。
cd sask-yt-home

#　NPMのインストールと実行
npm install && node server.js

# CloudflaredでURL化
cloudflared tunnel --url http://localhost:3000
※localhostのポート番号はログで確認してください。
（ディフォルトでは3000です。）

Cloudflared実行後、ログ内に```
```bash
(日時+日付等) INF |  https://〇〇〇〇〇〇.trycloudflare.com
```
と含まれていたら、URLをコピーしてサイトに飛んでください。
うまくサイトが動いていれば、成功です。
なお、ページが表示されない場合でも数分開けて再読込すると、
表示されることもあります。
