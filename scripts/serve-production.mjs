process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import * as dotenv from "dotenv";
import worker from "../build/server/index.js";

dotenv.config({ path: ".env.local" });
dotenv.config();

const clientDir = path.resolve(process.cwd(), "build/client");
const publicDir = path.resolve(process.cwd(), "public");

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

const server = http.createServer(async (req, res) => {
  const urlPath = req.url.split("?")[0];

  // Try static client asset
  let filePath = path.join(clientDir, urlPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(publicDir, urlPath);
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
    return fs.createReadStream(filePath).pipe(res);
  }

  // SSR via worker
  try {
    const fullUrl = `http://localhost:${server.address().port}${req.url}`;
    const request = new Request(fullUrl, {
      method: req.method,
      headers: req.headers,
    });

    const env = {
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "sk_test_placeholder_smoke_test_key_12345",
      CLERK_PUBLISHABLE_KEY:
        process.env.VITE_CLERK_PUBLISHABLE_KEY ||
        process.env.CLERK_PUBLISHABLE_KEY ||
        "pk_test_bWlnaHR5LW1vbGUtNTQuY2xlcmsuYWNjb3VudHMuZGV2JA",
      DATABASE_URL: process.env.DATABASE_URL || "",
    };

    const ctx = {
      waitUntil() {},
      passThroughOnException() {},
    };

    const response = await worker.fetch(request, env, ctx);

    res.statusCode = response.status;
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    const arrayBuffer = await response.arrayBuffer();
    res.end(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error("SSR Worker error:", err);
    res.statusCode = 500;
    res.end(String(err));
  }
});

const port = process.env.PORT || 8787;
server.listen(port, () => {
  console.log(`Production SSR server running at http://localhost:${port}`);
});
