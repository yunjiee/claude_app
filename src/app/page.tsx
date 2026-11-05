'use client'

import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'

const THEME_STYLES: Record<string, { bg: string; border: string; iconBg: string }> = {
  blog:      { bg: 'hover:bg-orange-50',  border: 'hover:border-orange-200', iconBg: 'bg-orange-100' },
  portfolio: { bg: 'hover:bg-purple-50',  border: 'hover:border-purple-200', iconBg: 'bg-purple-100' },
  shop:      { bg: 'hover:bg-emerald-50', border: 'hover:border-emerald-200', iconBg: 'bg-emerald-100' },
  workspace: { bg: 'hover:bg-blue-50',    border: 'hover:border-blue-200',   iconBg: 'bg-blue-100' },
}

export default function HomePage() {
  const { themes } = useTheme()

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      {/* Hero */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-500 mb-6">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          正在開發中
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 leading-tight">
          一個平台，<br />
          <span className="text-gray-400">無限可能</span>
        </h1>
        <p className="mt-5 text-lg text-gray-500 max-w-md mx-auto leading-relaxed">
          部落格、作品集、商城、工作區——自由切換，專注在你想做的事。
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/workspace"
            className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
          >
            開始使用
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            瀏覽部落格
          </Link>
        </div>
      </div>

      {/* 主題卡片 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {themes.map((theme) => {
          const style = THEME_STYLES[theme.id] ?? { bg: 'hover:bg-gray-50', border: 'hover:border-gray-300', iconBg: 'bg-gray-100' }
          return (
            <Link
              key={theme.id}
              href={theme.path}
              className={`group rounded-2xl border border-gray-200 p-6 transition-all ${style.bg} ${style.border} hover:shadow-md`}
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${style.iconBg}`}>
                {theme.icon}
              </div>
              <h2 className="text-base font-semibold text-gray-900">{theme.name}</h2>
              <p className="mt-1 text-sm text-gray-400 leading-relaxed">{theme.description}</p>
              <div className="mt-4 flex items-center gap-1 text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                <span>前往</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* 底部特色說明 */}
      <div className="mt-16 grid gap-6 sm:grid-cols-3 text-center">
        {[
          { icon: '⚡', title: '快速切換', desc: '頂部導航隨時切換主題，不需重新整理' },
          { icon: '💾', title: '自動儲存', desc: '工作區內容即時存入瀏覽器，不怕遺失' },
          { icon: '🔐', title: '登入保護', desc: '部落格與商城需登入才能進入' },
        ].map((f) => (
          <div key={f.title} className="rounded-xl bg-gray-50 p-6">
            <div className="text-2xl mb-3">{f.icon}</div>
            <p className="text-sm font-semibold text-gray-900">{f.title}</p>
            <p className="mt-1 text-xs text-gray-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
