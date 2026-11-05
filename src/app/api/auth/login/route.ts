import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE } from '@/lib/auth/constants'

// 模擬帳號（之後替換為真實資料庫查詢）
const MOCK_USERS = [
  { id: '1', email: 'user@example.com', password: '123456', name: '測試使用者' },
]

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  )

  if (!user) {
    return NextResponse.json({ error: '帳號或密碼錯誤' }, { status: 401 })
  }

  // 實際專案應使用 JWT library 簽名，這裡用 base64 模擬
  const token = Buffer.from(JSON.stringify({ id: user.id, name: user.name, email: user.email })).toString('base64')

  const res = NextResponse.json({ name: user.name, email: user.email })

  // 設定 httpOnly cookie，JavaScript 無法讀取，防止 XSS
  res.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 天
  })

  return res
}
