/**
 * Helpers for detecting and configuring preview / non-production environments.
 */

export function isPreviewOrNonProduction(url: string, nodeEnv?: string): boolean {
  if (nodeEnv && nodeEnv !== "production") {
    return true;
  }
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    return (
      hostname.includes("preview") ||
      hostname.includes("staging") ||
      hostname.endsWith(".workers.dev") ||
      hostname === "localhost" ||
      hostname === "127.0.0.1"
    );
  } catch {
    return true;
  }
}

export function getRobotsHeaderValue(isNonProd: boolean): string {
  return isNonProd ? "noindex, nofollow, noarchive" : "index, follow";
}
