/**
 * Fluorite Labs — In-Memory Sliding Window Rate Limiter
 * Spec: LEAD-003 (Anti-Abuse & Rate Limiting for Lead Creation)
 */

interface RateLimitRecord {
  timestamps: number[];
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetInSeconds: number;
}

export class SlidingWindowRateLimiter {
  private store = new Map<string, RateLimitRecord>();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(options: { maxRequests?: number; windowSeconds?: number } = {}) {
    this.maxRequests = options.maxRequests ?? 5;
    this.windowMs = (options.windowSeconds ?? 60) * 1000;
  }

  /**
   * Evaluates if a request from the given identifier (IP) is allowed.
   */
  public check(identifier: string, now: number = Date.now()): RateLimitResult {
    const record = this.store.get(identifier) || { timestamps: [] };

    // Prune timestamps older than window
    const windowStart = now - this.windowMs;
    const activeTimestamps = record.timestamps.filter((ts) => ts > windowStart);

    if (activeTimestamps.length >= this.maxRequests) {
      const oldestActive = activeTimestamps[0];
      const resetInSeconds = Math.max(1, Math.ceil((oldestActive + this.windowMs - now) / 1000));

      return {
        allowed: false,
        limit: this.maxRequests,
        remaining: 0,
        resetInSeconds,
      };
    }

    activeTimestamps.push(now);
    this.store.set(identifier, { timestamps: activeTimestamps });

    // Clean up memory if store grows too large (> 5000 tracked IPs)
    if (this.store.size > 5000) {
      for (const [key, val] of this.store.entries()) {
        if (val.timestamps.every((ts) => ts <= windowStart)) {
          this.store.delete(key);
        }
      }
    }

    const resetInSeconds = Math.ceil(this.windowMs / 1000);

    return {
      allowed: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - activeTimestamps.length,
      resetInSeconds,
    };
  }

  /**
   * Resets rate limit records (useful for testing).
   */
  public reset(): void {
    this.store.clear();
  }
}

// Global singleton instance for leads endpoint
export const leadCreationRateLimiter = new SlidingWindowRateLimiter({
  maxRequests: 5,
  windowSeconds: 60,
});

/**
 * Extracts client IP safely from request headers.
 */
export function getClientIp(request: Request): string {
  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }

  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  return "127.0.0.1";
}
