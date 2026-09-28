import { spawn } from "node:child_process";
import path from "node:path";
import http from "node:http";

async function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode && res.statusCode < 500) {
            resolve();
          } else {
            reject(new Error(`Status ${res.statusCode}`));
          }
        });
        req.on("error", reject);
        req.end();
      });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error(`Timeout waiting for server at ${url}`);
}

async function main() {
  console.log("Starting server on port 8787...");
  const server = spawn("node", ["scripts/serve-production.mjs"], {
    stdio: "pipe",
    env: { ...process.env, PORT: "8787" },
  });

  try {
    await waitForServer("http://localhost:8787");
    console.log("Server ready! Capturing Microbriefing screenshots...");

    const outDir = path.resolve(process.cwd(), "docs");
    const desktopBriefing = path.join(outDir, "microbriefing-desktop.png");
    const mobileBriefing = path.join(outDir, "microbriefing-mobile.png");

    // 1. Desktop Microbriefing Modal
    console.log("Capturing desktop microbriefing...");
    await new Promise((resolve, reject) => {
      const ps = spawn(
        "npx.cmd",
        [
          "playwright",
          "screenshot",
          "--channel=chrome",
          '--viewport-size="1440, 900"',
          "--wait-for-timeout=2000",
          "http://localhost:8787/?briefing=true",
          desktopBriefing,
        ],
        { stdio: "inherit", shell: true },
      );
      ps.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Desktop screenshot failed with code ${code}`));
      });
    });

    // 2. Mobile Microbriefing Modal
    console.log("Capturing mobile microbriefing...");
    await new Promise((resolve, reject) => {
      const ps = spawn(
        "npx.cmd",
        [
          "playwright",
          "screenshot",
          "--channel=chrome",
          '--viewport-size="390, 844"',
          "--wait-for-timeout=2000",
          "http://localhost:8787/?briefing=true",
          mobileBriefing,
        ],
        { stdio: "inherit", shell: true },
      );
      ps.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Mobile screenshot failed with code ${code}`));
      });
    });

    console.log("Screenshots captured successfully!");
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error("Capture process error:", err);
  process.exit(1);
});
