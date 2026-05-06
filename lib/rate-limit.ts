const requests: Record<string, { count: number; resetTime: number }> = {}

export function rateLimit(key: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = requests[key]

  if (!record || now > record.resetTime) {
    requests[key] = { count: 1, resetTime: now + windowMs }
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}