'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useTheme } from '@/contexts/ThemeContext'
import { CardSpotlight } from '@/components/ui/card-spotlight'

const HeroScene = dynamic(() => import('@/components/three/hero-scene'), { ssr: false })

const THEME_CFG: Record<string, { from: string; to: string; shadow: string; ring: string }> = {
  blog:      { from: 'from-orange-400', to: 'to-amber-400',  shadow: 'shadow-orange-500/25', ring: 'hover:ring-orange-400/40' },
  portfolio: { from: 'from-violet-500', to: 'to-purple-500', shadow: 'shadow-violet-500/25', ring: 'hover:ring-violet-400/40' },
  shop:      { from: 'from-emerald-400',to: 'to-teal-400',   shadow: 'shadow-emerald-500/25',ring: 'hover:ring-emerald-400/40' },
  workspace: { from: 'from-blue-500',   to: 'to-indigo-500', shadow: 'shadow-blue-500/25',   ring: 'hover:ring-blue-400/40' },
}

const SPOTLIGHT: Record<string, string> = {
  blog:      'rgba(251,146,60,0.2)',
  portfolio: 'rgba(139,92,246,0.2)',
  shop:      'rgba(52,211,153,0.2)',
  workspace: 'rgba(99,102,241,0.2)',
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
})

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
})

const STEPS = [
  { n: '01', icon: '🎯', title: '選擇主題', desc: '從四個主題選一個切入，可隨時切換，互不干擾' },
  { n: '02', icon: '✍️', title: '建立內容', desc: '工作區規劃待辦、部落格發文、商城上架商品' },
  { n: '03', icon: '🚀', title: '發布分享', desc: '公開作品集、分享文章連結，讓更多人看見你' },
]

const FEATURES = [
  { icon: '⚡', label: '即時切換', desc: '頂部導覽隨時切換，不需重新整理頁面', bar: 'from-yellow-400 to-orange-500' },
  { icon: '💾', label: '自動儲存', desc: '工作區內容即時存入瀏覽器，不怕遺失',  bar: 'from-blue-400 to-indigo-600' },
  { icon: '🔐', label: '登入保護', desc: '部落格與商城限制登入後才能進入',       bar: 'from-emerald-400 to-teal-600' },
]

function AppPreview() {
  return (
    <motion.div {...inView(0.1)} className="relative mx-auto mt-14 max-w-3xl">
      <div className="absolute inset-x-20 top-6 h-28 bg-gradient-to-r from-blue-400/20 via-violet-400/25 to-indigo-400/20 blur-3xl -z-10" />
      <div className="rounded-2xl border border-white/20 dark:border-gray-700/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl shadow-gray-400/20 dark:shadow-gray-900/50 overflow-hidden ring-1 ring-gray-100 dark:ring-gray-800">
        <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/80 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/90" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/90" />
            <div className="w-3 h-3 rounded-full bg-green-400/90" />
          </div>
          <div className="flex-1 mx-4 h-5 rounded-md bg-white border border-gray-200 flex items-center px-3 gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
            <span className="text-[10px] text-gray-400 font-mono">claude-app.vercel.app</span>
          </div>
        </div>
        <div className="flex h-56 sm:h-72">
          <div className="w-44 flex-shrink-0 border-r border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/60 p-4 flex flex-col gap-1">
            <div className="text-[11px] font-bold text-gray-900 dark:text-gray-100 mb-2 px-2">🗂 工作區</div>
            {[
              { icon: '📄', name: 'Q4 計劃',   color: 'text-blue-500' },
              { icon: '🎨', name: '設計稿整理', color: 'text-violet-500' },
              { icon: '📌', name: '讀書筆記',   color: 'text-orange-500' },
              { icon: '✅', name: '本週待辦',   color: 'text-emerald-500' },
            ].map(p => (
              <div key={p.name} className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 py-1.5 px-2 rounded-lg hover:bg-white/80 dark:hover:bg-gray-700/80 cursor-pointer">
                <span className={p.color}>{p.icon}</span>
                <span>{p.name}</span>
              </div>
            ))}
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-5 w-32 rounded-lg bg-gray-200/80" />
              <div className="h-5 w-16 rounded-full bg-blue-100 ml-auto" />
            </div>
            <div className="space-y-2.5 mb-6">
              <div className="h-2.5 w-full rounded-full bg-gray-100" />
              <div className="h-2.5 w-5/6 rounded-full bg-gray-100" />
              <div className="h-2.5 w-4/6 rounded-full bg-gray-100" />
            </div>
            <div className="flex gap-2 mb-6">
              <div className="h-6 w-14 rounded-full bg-blue-100" />
              <div className="h-6 w-20 rounded-full bg-violet-100" />
              <div className="h-6 w-12 rounded-full bg-emerald-100" />
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className={`h-5 rounded text-[9px] flex items-center justify-center font-medium ${
                  i === 8 ? 'bg-blue-500 text-white' :
                  i === 3 || i === 11 ? 'bg-orange-100 text-orange-500' :
                  'bg-gray-50 text-gray-400'
                }`}>{i + 1}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function HomePage() {
  const { themes } = useTheme()

  return (
    <main className="mx-auto max-w-5xl px-6 py-20 overflow-x-hidden bg-white dark:bg-gray-950">

      {/* HERO */}
      <section className="relative text-center mb-32 min-h-[520px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <HeroScene />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="aurora-1 absolute top-0 left-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-blue-300/25 to-indigo-400/20 blur-3xl" />
          <div className="aurora-2 absolute top-8 right-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-violet-300/25 to-pink-300/15 blur-3xl" />
        </div>

        <motion.div {...fadeUp(0)}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-8 shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          正在開發中
        </motion.div>

        <motion.h1 {...fadeUp(0.07)} className="text-6xl sm:text-7xl font-black tracking-tight leading-[1.06] mb-5 text-gray-900 dark:text-gray-50">
          一個平台<br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
            無限可能
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.14)} className="text-base sm:text-lg text-gray-400 dark:text-gray-500 max-w-sm mx-auto leading-relaxed mb-10">
          部落格 · 作品集 · 商城 · 工作區<br />
          <span className="text-sm">自由切換，專注在你想做的事</span>
        </motion.p>

        <motion.div {...fadeUp(0.2)} className="flex items-center justify-center gap-3">
          <Link href="/workspace"
            className="rounded-full bg-gray-900 px-8 py-3 text-sm font-bold text-white shadow-lg hover:bg-gray-700 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95">
            開始使用
          </Link>
          <Link href="/blog"
            className="rounded-full border border-gray-200 bg-white/70 backdrop-blur px-8 py-3 text-sm font-semibold text-gray-600 hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all">
            瀏覽部落格
          </Link>
        </motion.div>

        <AppPreview />
      </section>

      {/* STEP FLOW */}
      <section className="mb-28">
        <motion.p {...inView()} className="text-[11px] font-bold tracking-[.18em] text-gray-400 dark:text-gray-500 uppercase text-center mb-10">三步開始</motion.p>
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm">
          {STEPS.map((s, i) => (
            <motion.div key={s.n} {...inView(i * 0.1)} className="relative flex flex-col bg-white dark:bg-gray-900 p-8 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
              {i < 2 && (
                <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-400 text-sm">›</div>
              )}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="text-[10px] font-bold tracking-widest text-gray-300 mb-1">{s.n}</div>
                  <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-bold flex items-center justify-center shadow">{parseInt(s.n)}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-bold text-sm text-gray-900 dark:text-gray-100">{s.title}</span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THEME CARDS — dark glass + CardSpotlight */}
      <section className="mb-28">
        <motion.p {...inView()} className="text-[11px] font-bold tracking-[.18em] text-gray-400 dark:text-gray-500 uppercase text-center mb-10">選擇主題</motion.p>
        <div className="relative rounded-3xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 -z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.3),transparent_60%)] -z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(139,92,246,0.2),transparent_60%)] -z-10" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {themes.map((theme, i) => {
              const c = THEME_CFG[theme.id] ?? { from: 'from-gray-400', to: 'to-gray-500', shadow: 'shadow-gray-500/20', ring: 'hover:ring-white/20' }
              const spotColor = SPOTLIGHT[theme.id] ?? 'rgba(255,255,255,0.1)'
              return (
                <motion.div key={theme.id} {...inView(i * 0.09)}>
                  <CardSpotlight color={spotColor} className={`rounded-2xl ring-1 ring-white/10 ${c.ring} hover:ring-2 transition-all`}>
                    <Link href={theme.path}
                      className={`group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.14] hover:shadow-2xl ${c.shadow} hover:-translate-y-1.5 transition-all duration-300 overflow-hidden`}
                    >
                      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${c.from} ${c.to} opacity-80`} />
                      <div className="p-5">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.from} ${c.to} flex items-center justify-center text-xl shadow-lg mb-4`}>
                          {theme.icon}
                        </div>
                        <h2 className="text-sm font-bold text-white mb-1.5">{theme.name}</h2>
                        <p className="text-xs text-white/50 leading-relaxed">{theme.description}</p>
                      </div>
                      <div className="px-5 pb-5 flex items-center gap-1 text-xs font-bold text-white/30 group-hover:text-white/70 group-hover:gap-2 transition-all">
                        <span>前往</span><span>→</span>
                      </div>
                    </Link>
                  </CardSpotlight>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section>
        <motion.p {...inView()} className="text-[11px] font-bold tracking-[.18em] text-gray-400 dark:text-gray-500 uppercase text-center mb-10">核心特色</motion.p>
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div key={f.label} {...inView(i * 0.1)}
              className="relative flex gap-4 items-start rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${f.bar} rounded-l-2xl`} />
              <div className="text-2xl">{f.icon}</div>
              <div>
                <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{f.label}</p>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  )
}
