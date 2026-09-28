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
    console.log("Server ready! Capturing mobile views with Playwright...");

    const outDir = path.resolve(process.cwd(), "docs");
    const mobileHero = path.join(outDir, "hero-mobile-implemented.png");
    const mobileMenu = path.join(outDir, "hero-mobile-menu-implemented.png");

    // 1. Mobile viewport screenshot (Hero)
    await new Promise((resolve, reject) => {
      const ps = spawn(
        "npx.cmd",
        [
          "playwright",
          "screenshot",
          "--channel=chrome",
          '--viewport-size="390, 844"',
          "--wait-for-timeout=3000",
          "http://localhost:8787/",
          mobileHero,
        ],
        { stdio: "inherit", shell: true },
      );
      ps.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Mobile screenshot failed with code ${code}`));
      });
    });

    console.log(`✓ Mobile Hero screenshot saved to ${mobileHero}!`);

    // 2. Mobile viewport screenshot (Fullscreen Menu Drawer)
    await new Promise((resolve, reject) => {
      const ps = spawn(
        "npx.cmd",
        [
          "playwright",
          "screenshot",
          "--channel=chrome",
          '--viewport-size="390, 844"',
          "--wait-for-timeout=3000",
          "http://localhost:8787/?menu=true",
          mobileMenu,
        ],
        { stdio: "inherit", shell: true },
      );
      ps.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Mobile menu screenshot failed with code ${code}`));
      });
    });

    console.log(`✓ Mobile Menu screenshot saved to ${mobileMenu}!`);
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
