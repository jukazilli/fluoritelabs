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
  console.log("Starting server on port 8788 for visual capture...");
  const server = spawn("node", ["scripts/serve-production.mjs"], {
    stdio: "pipe",
    env: { ...process.env, PORT: "8788", NODE_TLS_REJECT_UNAUTHORIZED: "0" },
  });

  try {
    await waitForServer("http://localhost:8788");
    console.log("Server ready! Capturing Journal views with Playwright...");

    const outDir = path.resolve(process.cwd(), "docs");

    // 1. Journal Index Desktop
    const journalIndexDesktop = path.join(outDir, "journal-index-desktop.png");
    await captureScreenshot("http://localhost:8788/journal", journalIndexDesktop, "1280, 800");
    console.log(`✓ Journal Index Desktop saved to ${journalIndexDesktop}`);

    // 2. Journal Article Desktop
    const journalArticleDesktop = path.join(outDir, "journal-article-desktop.png");
    await captureScreenshot(
      "http://localhost:8788/journal/site-institucional-ou-landing-page",
      journalArticleDesktop,
      "1280, 800",
    );
    console.log(`✓ Journal Article Desktop saved to ${journalArticleDesktop}`);

    // 3. Journal Index Mobile
    const journalIndexMobile = path.join(outDir, "journal-index-mobile.png");
    await captureScreenshot("http://localhost:8788/journal", journalIndexMobile, "390, 844");
    console.log(`✓ Journal Index Mobile saved to ${journalIndexMobile}`);

    // 4. Journal Article Mobile
    const journalArticleMobile = path.join(outDir, "journal-article-mobile.png");
    await captureScreenshot(
      "http://localhost:8788/journal/site-institucional-ou-landing-page",
      journalArticleMobile,
      "390, 844",
    );
    console.log(`✓ Journal Article Mobile saved to ${journalArticleMobile}`);

    console.log("\nAll M5 Journal visual artifacts captured successfully!");
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
