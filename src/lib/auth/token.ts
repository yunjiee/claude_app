import { createHmac, timingSafeEqual } from 'crypto'

const SECRET = process.env.AUTH_SECRET ?? 'dev-secret-please-set-AUTH_SECRET-in-env'

export interface TokenPayload {
  id: string
  name: string
  email: string
}

export function signToken(payload: TokenPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const sig = createHmac('sha256', SECRET).update(data).digest('base64url')
  return `${data}.${sig}`
}

export function verifyToken(token: string): TokenPayload | null {
  const dot = token.lastIndexOf('.')
  if (dot < 0) return null
  const data = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  const expected = createHmac('sha256', SECRET).update(data).digest('base64url')
  try {
    if (!timingSafeEqual(Buffer.from(sig, 'base64url'), Buffer.from(expected, 'base64url'))) return null
  } catch {
    return null
  }
  try {
    return JSON.parse(Buffer.from(data, 'base64url').toString()) as TokenPayload
  } catch {
    return null
  }
}
