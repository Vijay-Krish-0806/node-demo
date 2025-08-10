const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const FILES_DIR = path.join(__dirname, "files");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".avi": "video/x-msvideo",
};

function send404(res, msg = "Not Found") {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end(msg);
}

function send415(res, msg = "Unsupported Media Type") {
  res.writeHead(415, { "Content-Type": "text/plain" });
  res.end(msg);
}

function serveStatic(filePath, res) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) return send404(res);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

function listFiles(res) {
  fs.readdir(FILES_DIR, (err, files) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("Cannot read files directory");
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(files.filter((f) => !f.startsWith("."))));
  });
}

function serveFile(req, res, filename) {
  if (!filename) return send404(res, "File not specified");
  const fullPath = path.join(FILES_DIR, filename);

  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) return send404(res, "File not found");

    const ext = path.extname(fullPath).toLowerCase();
    const type = mimeTypes[ext];
    if (!type) return send415(res);

    // Video range request support
    if (type.startsWith("video/")) {
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;

        if (start >= stats.size) {
          res.writeHead(416, { "Content-Range": `bytes */${stats.size}` });
          return res.end();
        }

        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${end}/${stats.size}`,
          "Accept-Ranges": "bytes",
          "Content-Length": end - start + 1,
          "Content-Type": type,
        });
        fs.createReadStream(fullPath, { start, end }).pipe(res);
      } else {
        res.writeHead(200, {
          "Content-Length": stats.size,
          "Content-Type": type,
          "Accept-Ranges": "bytes",
        });
        fs.createReadStream(fullPath).pipe(res);
      }
      return;
    }

    // Other files (text/json/image)
    res.writeHead(200, { "Content-Type": type, "Content-Length": stats.size });
    fs.createReadStream(fullPath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];

  if (url === "/") return serveStatic(path.join(PUBLIC_DIR, "index.html"), res);

  if (url === "/api/list") return listFiles(res);

  if (url.startsWith("/api/file")) {
    const query = req.url.split("?")[1];
    const params = new URLSearchParams(query);
    const name = params.get("name");
    return serveFile(req, res, name);
  }

  send404(res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
