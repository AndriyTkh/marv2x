// Simple in-memory rate limiter
// For production, consider using Redis or a dedicated rate limiting service

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up old entries every 10 minutes
setInterval(
  () => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  },
  1 * 60 * 1000,
);

export function checkRateLimit(
  identifier: string,
  maxRequests = 3,
  windowMs = 60 * 60 * 1000,
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    // First request or window expired
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  if (entry.count >= maxRequests) {
    // Rate limit exceeded
    return false;
  }

  // Increment count
  entry.count++;
  return true;
}

export function getRateLimitInfo(
  identifier: string,
): { remaining: number; resetTime: number } | null {
  const entry = rateLimitMap.get(identifier);
  if (!entry || Date.now() > entry.resetTime) {
    return null;
  }
  return {
    remaining: Math.max(0, 3 - entry.count),
    resetTime: entry.resetTime,
  };
}
