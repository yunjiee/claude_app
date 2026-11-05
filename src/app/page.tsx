'use client'

import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'

export default function HomePage() {
  const { themes } = useTheme()

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          歡迎來到 MyApp
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          選擇一個主題開始探索
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {themes.map((theme) => (
          <Link
            key={theme.id}
            href={theme.path}
            className="group rounded-2xl border border-gray-200 p-8 text-center hover:border-gray-900 hover:shadow-lg transition-all"
          >
            <div className="text-4xl">{theme.icon}</div>
            <h2 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-black">
              {theme.name}
            </h2>
            <p className="mt-2 text-sm text-gray-400">{theme.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
