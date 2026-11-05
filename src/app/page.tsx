'use client'

import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'

const THEME_CFG: Record<string, { from: string; via: string; to: string; light: string; ring: string }> = {
  blog:      { from: 'from-orange-400', via: 'via-amber-400',  to: 'to-yellow-400',  light: 'bg-orange-50',  ring: 'ring-orange-200' },
  portfolio: { from: 'from-violet-500', via: 'via-purple-500', to: 'to-indigo-500',  light: 'bg-violet-50',  ring: 'ring-violet-200' },
  shop:      { from: 'from-emerald-400',via: 'via-teal-400',   to: 'to-cyan-400',    light: 'bg-emerald-50', ring: 'ring-emerald-200' },
  workspace: { from: 'from-blue-500',   via: 'via-indigo-500', to: 'to-violet-500',  light: 'bg-blue-50',    ring: 'ring-blue-200' },
}

const STEPS = [
  { n: '01', icon: '🎯', title: '選擇主題', desc: '從四個主題選一個切入，可隨時切換，互不干擾' },
  { n: '02', icon: '✍️', title: '建立內容', desc: '工作區規劃待辦、部落格發文、商城上架商品' },
  { n: '03', icon: '🚀', title: '發布分享', desc: '公開作品集、分享文章連結，讓更多人看見你' },
]

const FEATURES = [
  { icon: '⚡', label: '即時切換',  desc: '頂部導覽隨時切換，不需重新整理頁面',    bar: 'from-yellow-400 to-orange-500' },
  { icon: '💾', label: '自動儲存',  desc: '工作區內容即時存入瀏覽器，不怕遺失',    bar: 'from-blue-400 to-indigo-600' },
  { icon: '🔐', label: '登入保護',  desc: '部落格與商城限制登入後才能進入',         bar: 'from-emerald-400 to-teal-600' },
]

export default function HomePage() {
  const { themes } = useTheme()

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">

      {/* ───── HERO ───── */}
      <section className="relative text-center mb-28">
        {/* Background blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-16 left-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 blur-3xl opacity-60" />
          <div className="absolute top-8 right-1/5 h-64 w-64 rounded-full bg-gradient-to-br from-violet-100 to-pink-200 blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-gradient-to-br from-amber-100 to-orange-200 blur-2xl opacity-40" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur px-4 py-1.5 text-xs font-medium text-gray-500 mb-7 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          正在開發中
        </div>

        <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.08] mb-5">
          一個平台<br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
            無限可能
          </span>
        </h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-sm mx-auto leading-relaxed">
          部落格 · 作品集 · 商城 · 工作區<br />
          <span className="text-sm">自由切換，專注在你想做的事</span>
        </p>

        <div className="mt-10 flex items-center justify-center gap-3">
          <Link href="/workspace"
            className="rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-gray-700 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95">
            開始使用
          </Link>
          <Link href="/blog"
            className="rounded-full border border-gray-200 bg-white/70 backdrop-blur px-8 py-3 text-sm font-medium text-gray-600 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all">
            瀏覽部落格
          </Link>
        </div>
      </section>

      {/* ───── STEP FLOW ───── */}
      <section className="mb-24">
        <p className="text-[11px] font-bold tracking-[.18em] text-gray-400 uppercase text-center mb-10">三步開始</p>

        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-100 rounded-3xl overflow-hidden shadow-sm">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative flex flex-col bg-white p-8 group hover:bg-gray-50/50 transition-colors">
              {/* Connector arrow */}
              {i < 2 && (
                <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-400 text-[11px]">
                  ›
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="text-[11px] font-bold tracking-widest text-gray-300">{s.n}</span>
                  <div className="mt-1 w-10 h-10 rounded-xl bg-gray-900 text-white text-sm font-bold flex items-center justify-center shadow">
                    {s.n.replace('0', '')}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-bold text-sm text-gray-900">{s.title}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── THEME CARDS ───── */}
      <section className="mb-24">
        <p className="text-[11px] font-bold tracking-[.18em] text-gray-400 uppercase text-center mb-10">選擇主題</p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {themes.map((theme) => {
            const c = THEME_CFG[theme.id] ?? { from: 'from-gray-400', via: 'via-gray-400', to: 'to-gray-500', light: 'bg-gray-50', ring: 'ring-gray-200' }
            return (
              <Link
                key={theme.id}
                href={theme.path}
                className={`group relative flex flex-col rounded-3xl overflow-hidden border border-gray-100 hover:ring-2 ${c.ring} hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300`}
              >
                {/* Gradient header */}
                <div className={`${c.light} px-6 pt-6 pb-5 relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.from} ${c.to} opacity-10`} />
                  <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full bg-gradient-to-br ${c.from} ${c.to} opacity-20 blur-xl`} />
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.from} ${c.to} flex items-center justify-center text-xl shadow-md relative z-10`}>
                    {theme.icon}
                  </div>
                </div>

                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.from} ${c.to}`} />

                {/* Body */}
                <div className="flex-1 bg-white px-6 pb-6 pt-4">
                  <h2 className="text-sm font-bold text-gray-900 mb-1">{theme.name}</h2>
                  <p className="text-xs text-gray-400 leading-relaxed">{theme.description}</p>
                  <div className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold bg-gradient-to-r ${c.from} ${c.to} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-all`}>
                    <span>前往</span>
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section>
        <p className="text-[11px] font-bold tracking-[.18em] text-gray-400 uppercase text-center mb-10">核心特色</p>

        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.label} className="relative flex gap-4 items-start rounded-2xl border border-gray-100 bg-white p-6 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${f.bar} rounded-l-2xl`} />
              <div className="text-2xl">{f.icon}</div>
              <div>
                <p className="font-bold text-sm text-gray-900">{f.label}</p>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
