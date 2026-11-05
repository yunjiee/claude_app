import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE } from '@/lib/auth/constants'

export async function GET(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value

  if (!token) {
    return NextResponse.json(null, { status: 401 })
  }

  try {
    const user = JSON.parse(Buffer.from(token, 'base64').toString())
    return NextResponse.json({ name: user.name, email: user.email })
  } catch {
    return NextResponse.json(null, { status: 401 })
  }
}
