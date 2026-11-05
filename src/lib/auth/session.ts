import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE } from './constants'
import { verifyToken, TokenPayload } from './token'

export function getSession(req: NextRequest): TokenPayload | null {
  const token = req.cookies.get(AUTH_COOKIE)?.value
  if (!token) return null
  return verifyToken(token)
}

/** 用於需要登入才能存取的 API route */
export function requireAuth(req: NextRequest): { user: TokenPayload } | NextResponse {
  const user = getSession(req)
  if (!user) return NextResponse.json({ error: '請先登入' }, { status: 401 })
  return { user }
}
