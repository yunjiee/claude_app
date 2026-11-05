export const AUTH_COOKIE = 'auth_token'

// 哪些路由需要登入才能進入
export const PROTECTED_ROUTES = ['/blog', '/shop']

// 已登入時不應該再進入的頁面（例如登入頁）
export const AUTH_ROUTES = ['/login']
