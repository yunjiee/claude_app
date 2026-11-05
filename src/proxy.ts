import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE, PROTECTED_ROUTES, AUTH_ROUTES } from '@/lib/auth/constants'

export function proxy(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value
  const path = req.nextUrl.pathname

  const isProtected = PROTECTED_ROUTES.some((r) => path.startsWith(r))
  const isAuthRoute = AUTH_ROUTES.some((r) => path.startsWith(r))

  // 未登入 → 想進保護頁面 → 轉去登入
  if (isProtected && !token) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirect', path) // 登入後跳回原頁
    return NextResponse.redirect(loginUrl)
  }

  // 已登入 → 想進登入頁 → 轉去首頁
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
}
