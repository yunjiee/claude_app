'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { useDarkMode } from '@/contexts/DarkModeContext'
import { useToast } from '@/contexts/ToastContext'
import { useCart } from '@/contexts/CartContext'

const THEME_ACCENT: Record<string, string> = {
  blog:      'from-orange-400 to-amber-400',
  portfolio: 'from-violet-500 to-purple-500',
  shop:      'from-emerald-400 to-teal-500',
  workspace: 'from-blue-500 to-indigo-500',
}

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="12" cy="12" r="5" />
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export default function Header() {
  const { currentTheme, themes, switchTheme } = useTheme()
  const { user, logout } = useAuth()
  const { isDark, toggle: toggleDark } = useDarkMode()
  const { showToast } = useToast()
  const { count } = useCart()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    showToast('已成功登出', 'success')
    setMenuOpen(false)
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm dark:shadow-gray-900/30">
      {/* Active theme accent line */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${THEME_ACCENT[currentTheme.id] ?? 'from-gray-300 to-gray-400'} transition-all duration-500`} />

      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="text-lg font-black tracking-tight text-gray-900 dark:text-gray-100 hover:opacity-80 transition-opacity">
          MyApp
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {themes.map((theme) => {
            const isActive = currentTheme.id === theme.id
            return (
              <button
                key={theme.id}
                onClick={() => switchTheme(theme.id)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <span>{theme.icon}</span>
                <span>{theme.name}</span>
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Ctrl+K hint */}
          <button
            onClick={() => {
              const e = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true })
              document.dispatchEvent(e)
            }}
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-2.5 py-1.5 text-[11px] text-gray-400 dark:text-gray-500 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
            title="開啟快速導覽"
          >
            <kbd className="font-mono">⌘K</kbd>
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all"
            title={isDark ? '切換淺色模式' : '切換深色模式'}
            aria-label={isDark ? '切換淺色模式' : '切換深色模式'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Cart icon */}
          <Link
            href="/shop"
            className="relative flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="購物車"
          >
            <span className="text-base">🛒</span>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] rounded-full bg-emerald-500 text-white text-[9px] font-black flex items-center justify-center px-0.5">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </Link>

          {/* User / login */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/account" className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">
                  {user.name.slice(0, 1)}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 transition-all"
              >
                登出
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:block rounded-xl bg-gray-900 dark:bg-gray-100 px-4 py-1.5 text-sm font-semibold text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 hover:shadow-sm transition-all active:scale-95"
            >
              登入
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="sm:hidden flex flex-col items-center justify-center w-9 h-9 gap-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="選單"
          >
            <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 rounded-full transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 pb-4 pt-3 space-y-1">
          {themes.map((theme) => {
            const isActive = currentTheme.id === theme.id
            return (
              <button
                key={theme.id}
                onClick={() => { switchTheme(theme.id); setMenuOpen(false) }}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span>{theme.icon}</span>
                <span>{theme.name}</span>
              </button>
            )
          })}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-2 mt-2">
            <button
              onClick={toggleDark}
              className="w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
            >
              <span>{isDark ? '☀️' : '🌙'}</span>
              <span>{isDark ? '淺色模式' : '深色模式'}</span>
            </button>
            {user ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <span>👤</span>
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                >
                  <span>🚪</span>
                  <span>登出</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2.5 text-sm font-semibold text-center"
              >
                登入
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
