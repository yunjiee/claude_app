'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import PageLayout from '@/components/layout/PageLayout'
import { POSTS, CAT_CFG } from '@/lib/blog/posts'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
})

const CATEGORIES = ['全部', '技術', '設計', '生活']

const TAB_CFG: Record<string, { active: string; dot: string }> = {
  '全部': { active: 'bg-orange-500 text-white',  dot: 'bg-orange-400' },
  '技術': { active: 'bg-blue-500 text-white',    dot: 'bg-blue-400' },
  '設計': { active: 'bg-pink-500 text-white',    dot: 'bg-pink-400' },
  '生活': { active: 'bg-emerald-500 text-white', dot: 'bg-emerald-400' },
}

function formatDate(date: string) {
  return { month: date.slice(5, 7) + '月', day: date.slice(8) }
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('全部')

  const filtered = activeCategory === '全部'
    ? POSTS
    : POSTS.filter(p => p.category === activeCategory)

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <PageLayout title="部落格" description="文章與知識分享">

      {/* ── Category tabs ── */}
      <div className="mb-10 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const cfg = TAB_CFG[cat]
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? `${cfg.active} shadow-lg -translate-y-0.5`
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800'
              }`}
            >
              {!isActive && <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} opacity-60`} />}
              {cat}
              {isActive && <span className="text-[10px] opacity-70">({filtered.length})</span>}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-gray-400 py-16">此分類目前沒有文章</p>
      )}

      {filtered.length > 0 && (
        <div className="space-y-5">

          {/* ── Featured first post ── */}
          {featured && (
            <motion.div {...inView(0)}>
              <Link
                href={`/blog/${featured.id}`}
                className={`group cursor-pointer relative overflow-hidden rounded-3xl border bg-gradient-to-br ${featured.coverGradient} p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 block`}
              >
                <div className="absolute inset-0 bg-black/20 rounded-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`rounded-full bg-white/20 text-white px-3 py-0.5 text-xs font-bold`}>
                      {featured.category}
                    </span>
                    <span className="text-xs text-white/70 font-medium">{featured.date}</span>
                    <span className="ml-auto text-[10px] text-white/60">⏱ {featured.readTime} 分鐘</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white leading-snug mb-3">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-white/80 leading-relaxed line-clamp-2">{featured.summary}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all">
                    <span>閱讀全文</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* ── Rest of posts ── */}
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((post, i) => {
              const { month, day } = formatDate(post.date)
              const catCfg = CAT_CFG[post.category]
              return (
                <motion.div key={post.id} {...inView(i * 0.08 + 0.1)}>
                  <Link
                    href={`/blog/${post.id}`}
                    className="group cursor-pointer relative overflow-hidden flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 block"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-100 group-hover:bg-gradient-to-b group-hover:from-orange-300 group-hover:to-amber-400 rounded-l-2xl transition-all" />

                    <div className="hidden sm:flex flex-col items-center justify-center w-12 flex-shrink-0 rounded-xl bg-gray-50 py-3 group-hover:bg-orange-50 transition-colors">
                      <span className="text-[10px] text-gray-400 font-medium">{month}</span>
                      <span className="text-xl font-black text-gray-800 leading-none">{day}</span>
                    </div>

                    <div className="flex-1 min-w-0 pl-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${catCfg.badge}`}>
                          {post.category}
                        </span>
                        <span className="text-[10px] text-gray-400 sm:hidden">{post.date}</span>
                        <span className="text-[10px] text-gray-300 ml-auto">⏱ {post.readTime} 分</span>
                      </div>
                      <h2 className="text-sm font-bold text-gray-900 group-hover:text-gray-700 transition-colors leading-snug mb-1">
                        {post.title}
                      </h2>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{post.summary}</p>
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-gray-300 group-hover:text-orange-500 group-hover:gap-2 transition-all">
                        <span>閱讀全文</span>
                        <span>→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

        </div>
      )}

    </PageLayout>
  )
}
