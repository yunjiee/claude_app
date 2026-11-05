'use client'

import { motion } from 'motion/react'
import PageLayout from '@/components/layout/PageLayout'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
})

const mockProjects = [
  { id: '1', title: '多主題 Web App',   tech: ['Next.js', 'TypeScript', 'Tailwind'], desc: '支援部落格、作品集、商城、工作區四種主題的一體化平台，可自由切換，共用同一套認證與 API 層。', emoji: '🌐', gradient: 'from-violet-500 to-purple-600', light: 'from-violet-50 to-purple-50', border: 'border-violet-100', accent: 'text-violet-600' },
  { id: '2', title: 'UI 元件庫',         tech: ['React', 'Storybook', 'CSS Modules'], desc: '可重用的 React 元件庫，包含 30+ 個基礎元件與使用文件。', emoji: '🧩', gradient: 'from-blue-400 to-indigo-500', light: 'from-blue-50 to-indigo-50', border: 'border-blue-100', accent: 'text-blue-600' },
  { id: '3', title: 'API 後端服務',      tech: ['Node.js', 'PostgreSQL', 'REST'], desc: '高效能 RESTful API，支援每秒 1000+ 請求的並發處理。', emoji: '⚙️', gradient: 'from-emerald-400 to-teal-500', light: 'from-emerald-50 to-teal-50', border: 'border-emerald-100', accent: 'text-emerald-600' },
  { id: '4', title: '行動裝置應用',     tech: ['React Native', 'Expo', 'Firebase'], desc: '跨平台行動應用，iOS 和 Android 同步發布。', emoji: '📱', gradient: 'from-orange-400 to-amber-500', light: 'from-orange-50 to-amber-50', border: 'border-orange-100', accent: 'text-orange-600' },
  { id: '5', title: '資料視覺化儀表板', tech: ['D3.js', 'Python', 'Pandas'], desc: '即時資料分析與可視化，整合多個資料來源的統一介面。', emoji: '📊', gradient: 'from-pink-400 to-rose-500', light: 'from-pink-50 to-rose-50', border: 'border-pink-100', accent: 'text-pink-600' },
  { id: '6', title: '電商結帳系統',     tech: ['Next.js', 'Stripe', 'Prisma'], desc: '整合金流的完整電商解決方案，支援多種付款方式。', emoji: '💳', gradient: 'from-cyan-400 to-blue-500', light: 'from-cyan-50 to-blue-50', border: 'border-cyan-100', accent: 'text-cyan-600' },
]

const TECH_COLORS: Record<string, string> = {
  'Next.js': 'bg-black text-white',
  'TypeScript': 'bg-blue-600 text-white',
  'Tailwind': 'bg-cyan-500 text-white',
  'React': 'bg-blue-400 text-white',
  'Node.js': 'bg-green-600 text-white',
  'Firebase': 'bg-yellow-500 text-black',
  'Stripe': 'bg-indigo-600 text-white',
  'Prisma': 'bg-slate-800 text-white',
  'D3.js': 'bg-orange-500 text-white',
  'Python': 'bg-blue-700 text-white',
}

export default function PortfolioPage() {
  const featured = mockProjects[0]
  const rest = mockProjects.slice(1)

  return (
    <PageLayout title="作品集" description="個人開發作品展示">

      {/* ── Featured project ── */}
      <motion.div {...inView(0)} className={`group mb-6 cursor-pointer relative overflow-hidden rounded-3xl border ${featured.border} bg-gradient-to-br ${featured.light} p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>
        {/* Accent left bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${featured.gradient} rounded-l-3xl`} />
        {/* Decorative circle */}
        <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br ${featured.gradient} opacity-10 blur-2xl`} />

        <div className="pl-4">
          <span className={`text-[11px] font-bold tracking-[.16em] uppercase ${featured.accent} mb-3 block`}>精選作品</span>

          <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-5">
            <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${featured.gradient} flex items-center justify-center text-3xl shadow-lg`}>
              {featured.emoji}
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">{featured.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-lg">{featured.desc}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {featured.tech.map(t => (
              <span key={t} className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${TECH_COLORS[t] ?? 'bg-white text-gray-700 border border-gray-200'}`}>{t}</span>
            ))}
          </div>

          <div className={`inline-flex items-center gap-2 text-sm font-bold ${featured.accent} group-hover:gap-3 transition-all`}>
            <span>查看詳情</span>
            <span>→</span>
          </div>
        </div>
      </motion.div>

      {/* ── Project grid ── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project) => (
          <div
            key={project.id}
            className="group cursor-pointer relative flex flex-col rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
          >
            {/* Gradient emoji header */}
            <div className={`relative flex items-end gap-3 bg-gradient-to-br ${project.gradient} px-6 pt-5 pb-4 overflow-hidden`}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/3" />
              <div className="text-4xl drop-shadow">{project.emoji}</div>
              <h2 className="text-sm font-bold text-white drop-shadow pb-0.5">{project.title}</h2>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col p-5 bg-white">
              <p className="text-xs text-gray-400 leading-relaxed flex-1">{project.desc}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map(t => (
                  <span key={t} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${TECH_COLORS[t] ?? 'bg-gray-100 text-gray-600'}`}>{t}</span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-gray-300 group-hover:text-gray-600 group-hover:gap-2 transition-all">
                <span>查看詳情</span>
                <span>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </PageLayout>
  )
}
