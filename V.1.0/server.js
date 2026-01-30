const express = require("express");
const ytdl = require("@distube/ytdl-core");
const yts = require("yt-search");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

function cleanTrash() {
  const root = __dirname;
  const whitelist = [
    "server.js",
    "package.json",
    "package-lock.json",
    "node_modules",
    "public",
  ];
  fs.readdir(root, (err, files) => {
    if (err || !files) return;
    files.forEach((file) => {
      if (!whitelist.includes(file) && !file.startsWith(".")) {
        fs.unlink(path.join(root, file), () => {});
      }
    });
  });
}
setInterval(cleanTrash, 60000);

const getOptions = () => ({
  highWaterMark: 1 << 25,
  requestOptions: {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
    },
  },
});

app.get("/api/info", async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: "No ID" });
  try {
    const info = await ytdl.getInfo(id, getOptions());
    const d = info.videoDetails;
    res.json({
      id: d.videoId,
      title: d.title,
      description: d.description,
      channel: d.author.name,
      channelIcon: d.author.thumbnails?.[0]?.url,
      subscribers: d.author.subscriber_count,
      related: info.related_videos.slice(0, 15).map((v) => ({
        id: v.id,
        title: v.title,
        channel: v.author?.name,
        thumbnail: v.thumbnails[0]?.url,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/stream", async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).send("No ID");
  const isDl = req.query.dl === "1";

  try {
    const info = await ytdl.getInfo(id, getOptions());
    const format = ytdl.chooseFormat(info.formats, {
      filter: "audioandvideo",
      quality: "highest",
    });
    if (!format) return res.status(404).send("No Format");

    const size = format.contentLength;
    const range = req.headers.range;
    const headers = { "Content-Type": "video/mp4", "Accept-Ranges": "bytes" };

    if (isDl)
      headers["Content-Disposition"] = `attachment; filename="video.mp4"`;

    if (range && size) {
      const [start, end] = range
        .replace(/bytes=/, "")
        .split("-")
        .map((v) => (v ? parseInt(v, 10) : null));
      const realEnd = end === null ? size - 1 : end;
      headers["Content-Range"] = `bytes ${start}-${realEnd}/${size}`;
      headers["Content-Length"] = realEnd - start + 1;
      res.writeHead(206, headers);
      ytdl(id, {
        ...getOptions(),
        format,
        range: { start, end: realEnd },
      }).pipe(res);
    } else {
      if (size) headers["Content-Length"] = size;
      res.writeHead(200, headers);
      ytdl(id, { ...getOptions(), format }).pipe(res);
    }
  } catch (err) {
    console.error(err.message);
    if (!res.headersSent) res.status(500).end();
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const q = req.query.q || "Japan trending";
    const r = await yts(q);
    res.json({
      results: r.videos.map((v) => ({
        id: v.videoId,
        title: v.title,
        channel: v.author.name,
        thumbnail: v.thumbnail,
      })),
    });
  } catch (e) {
    res.json({ results: [] });
  }
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);
app.listen(PORT, () => console.log(`サーバーポート ${PORT} でサーバーを実行しました。`));
