'use client'

import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'

export default function Header() {
  const { currentTheme, themes, switchTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          MyApp
        </Link>

        <nav className="flex items-center gap-2">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => switchTheme(theme.id)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                currentTheme.id === theme.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span>{theme.icon}</span>
              <span>{theme.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
