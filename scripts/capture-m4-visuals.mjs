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

async function capture(url, outPath, viewport = "1440, 900") {
  return new Promise((resolve, reject) => {
    const ps = spawn(
      "npx.cmd",
      [
        "playwright",
        "screenshot",
        "--channel=chrome",
        `--viewport-size="${viewport}"`,
        "--wait-for-timeout=2500",
        url,
        outPath,
      ],
      { stdio: "inherit", shell: true },
    );
    ps.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Screenshot failed for ${url} with code ${code}`));
    });
  });
}

async function main() {
  console.log("Starting server on port 8787...");
  const server = spawn("node", ["scripts/serve-production.mjs"], {
    stdio: "pipe",
    env: { ...process.env, PORT: "8787" },
  });

  try {
    await waitForServer("http://localhost:8787");
    console.log("Server ready! Capturing M4 visual evidence...");

    const outDir = path.resolve(process.cwd(), "docs");

    // 1. Service Detail: /servicos/site-institucional
    console.log("1. Capturing Service Detail: /servicos/site-institucional...");
    await capture(
      "http://localhost:8787/servicos/site-institucional",
      path.join(outDir, "service-detail-implemented.png"),
    );

    // 2. Work Index: /work
    console.log("2. Capturing Work Index: /work...");
    await capture("http://localhost:8787/work", path.join(outDir, "work-index-implemented.png"));

    // 3. Work Case Detail: /work/aethel-architecture
    console.log("3. Capturing Work Case Detail: /work/aethel-architecture...");
    await capture(
      "http://localhost:8787/work/aethel-architecture",
      path.join(outDir, "work-case-implemented.png"),
    );

    console.log("All M4 evidence captured successfully!");
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error("Capture process error:", err);
  process.exit(1);
});
