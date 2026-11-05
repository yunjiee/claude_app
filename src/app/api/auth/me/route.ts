import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/session'

export async function GET(req: NextRequest) {
  const user = getSession(req)
  if (!user) return NextResponse.json(null, { status: 401 })
  return NextResponse.json({ name: user.name, email: user.email })
}
