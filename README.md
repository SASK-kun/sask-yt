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

