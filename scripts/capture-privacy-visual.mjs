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

async function captureScreenshot(url, outputPath, viewport = "1280, 800") {
  return new Promise((resolve, reject) => {
    const ps = spawn(
      "npx.cmd",
      [
        "playwright",
        "screenshot",
        "--channel=chrome",
        `--viewport-size="${viewport}"`,
        "--wait-for-timeout=2000",
        url,
        outputPath,
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
  console.log("Starting server on port 8789 for privacy page capture...");
  const server = spawn("node", ["scripts/serve-production.mjs"], {
    stdio: "pipe",
    env: { ...process.env, PORT: "8789", NODE_TLS_REJECT_UNAUTHORIZED: "0" },
  });

  try {
    await waitForServer("http://localhost:8789");
    console.log("Server ready! Capturing Privacy view with Playwright...");

    const outDir = path.resolve(process.cwd(), "docs");

    const privacyDesktop = path.join(outDir, "privacy-desktop.png");
    await captureScreenshot("http://localhost:8789/privacidade", privacyDesktop, "1280, 800");
    console.log(`✓ Privacy Desktop saved to ${privacyDesktop}`);

    const privacyMobile = path.join(outDir, "privacy-mobile.png");
    await captureScreenshot("http://localhost:8789/privacidade", privacyMobile, "390, 844");
    console.log(`✓ Privacy Mobile saved to ${privacyMobile}`);

    console.log("\nPrivacy visual artifacts captured successfully!");
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
