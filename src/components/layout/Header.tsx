'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'

const THEME_ACCENT: Record<string, string> = {
  blog:      'from-orange-400 to-amber-400',
  portfolio: 'from-violet-500 to-purple-500',
  shop:      'from-emerald-400 to-teal-500',
  workspace: 'from-blue-500 to-indigo-500',
}

export default function Header() {
  const { currentTheme, themes, switchTheme } = useTheme()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md shadow-sm">
      {/* Active theme accent line */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${THEME_ACCENT[currentTheme.id] ?? 'from-gray-300 to-gray-400'} transition-all duration-500`} />

      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="text-lg font-black tracking-tight text-gray-900 hover:opacity-80 transition-opacity">
          MyApp
        </Link>

        <nav className="flex items-center gap-1">
          {themes.map((theme) => {
            const isActive = currentTheme.id === theme.id
            const accent = THEME_ACCENT[theme.id] ?? 'from-gray-400 to-gray-500'
            return (
              <button
                key={theme.id}
                onClick={() => switchTheme(theme.id)}
                className={`relative flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {isActive && (
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${accent} opacity-0`} />
                )}
                <span>{theme.icon}</span>
                <span className="hidden sm:inline">{theme.name}</span>
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  {user.name.slice(0, 1)}
                </div>
                <span className="text-sm text-gray-600 font-medium">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-xl border border-gray-200 px-3.5 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                登出
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-gray-900 px-4 py-1.5 text-sm font-semibold text-white hover:bg-gray-700 hover:shadow-sm transition-all active:scale-95"
            >
              登入
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
