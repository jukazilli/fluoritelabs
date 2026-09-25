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
  console.log("1. Starting production SSR server on port 8787...");
  const serverProcess = spawn("node", ["scripts/serve-production.mjs"], {
    stdio: "pipe",
    env: { ...process.env, PORT: "8787" },
  });

  serverProcess.stdout.on("data", (d) => console.log(d.toString().trim()));
  serverProcess.stderr.on("data", (d) => console.error(d.toString().trim()));

  try {
    console.log("Waiting for http://localhost:8787 to be responsive...");
    await waitForServer("http://localhost:8787");
    console.log("✓ Server ready! Capturing desktop Hero screenshot at 1536x1024...");

    const outDir = path.resolve(process.cwd(), "docs");
    const heroScreenshot = path.join(outDir, "hero-desktop-implemented.png");
    const designSystemScreenshot = path.join(outDir, "design-system-implemented.png");

    // Capture Hero
    await new Promise((resolve, reject) => {
      const ps = spawn(
        "npx.cmd",
        [
          "playwright",
          "screenshot",
          "--channel=chrome",
          '--viewport-size="1536, 1024"',
          "--wait-for-timeout=4000",
          "http://localhost:8787/",
          heroScreenshot,
        ],
        { stdio: "inherit", shell: true },
      );
      ps.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Hero screenshot failed with code ${code}`));
      });
    });

    console.log(`✓ Hero screenshot saved to ${heroScreenshot}!`);

    // Capture Design System Sandbox
    console.log("Capturing Design System sandbox screenshot...");
    await new Promise((resolve, reject) => {
      const ps = spawn(
        "npx.cmd",
        [
          "playwright",
          "screenshot",
          "--channel=chrome",
          '--viewport-size="1536, 1024"',
          "--wait-for-timeout=3000",
          "http://localhost:8787/design-system",
          designSystemScreenshot,
        ],
        { stdio: "inherit", shell: true },
      );
      ps.on("close", (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Design System screenshot failed with code ${code}`));
      });
    });

    console.log(`✓ Design system screenshot saved to ${designSystemScreenshot}!`);
  } finally {
    console.log("Stopping server...");
    serverProcess.kill();
  }
}

main().catch((err) => {
  console.error("Visual proof error:", err);
  process.exit(1);
});
