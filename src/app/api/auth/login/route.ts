import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE } from '@/lib/auth/constants'
import { signToken } from '@/lib/auth/token'

// 模擬帳號（之後替換為真實資料庫查詢）
const MOCK_USERS = [
  { id: '1', email: 'user@example.com', password: '123456', name: '測試使用者' },
]

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: '請求格式錯誤' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: '請求格式錯誤' }, { status: 400 })
  }

  const { email, password } = body as Record<string, unknown>

  if (typeof email !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: '帳號或密碼格式錯誤' }, { status: 400 })
  }

  const trimmedEmail = email.trim().toLowerCase().slice(0, 254)
  const trimmedPassword = password.slice(0, 128)

  const user = MOCK_USERS.find(
    (u) => u.email === trimmedEmail && u.password === trimmedPassword
  )

  if (!user) {
    // 固定回應時間防止 timing attack
    await new Promise((r) => setTimeout(r, 300))
    return NextResponse.json({ error: '帳號或密碼錯誤' }, { status: 401 })
  }

  const token = signToken({ id: user.id, name: user.name, email: user.email })

  const res = NextResponse.json({ name: user.name, email: user.email })

  res.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 天
  })

  return res
}
