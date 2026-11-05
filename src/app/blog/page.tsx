'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useApi } from '@/hooks/useApi'

interface Post {
  id: string
  title: string
  date: string
  summary: string
}

const CATEGORIES = ['全部', '技術', '設計', '生活']

const CAT_CFG: Record<string, { active: string; dot: string }> = {
  '全部': { active: 'bg-orange-500 text-white shadow-orange-200',  dot: 'bg-orange-400' },
  '技術': { active: 'bg-blue-500 text-white shadow-blue-200',      dot: 'bg-blue-400' },
  '設計': { active: 'bg-pink-500 text-white shadow-pink-200',      dot: 'bg-pink-400' },
  '生活': { active: 'bg-emerald-500 text-white shadow-emerald-200',dot: 'bg-emerald-400' },
}

function formatDate(date: string) {
  return { month: date.slice(5, 7) + '月', day: date.slice(8) }
}

export default function BlogPage() {
  const { data: posts, loading, error, refetch } = useApi<Post[]>('/api/blog/posts')
  const [activeCategory, setActiveCategory] = useState('全部')

  return (
    <PageLayout title="部落格" description="文章與知識分享">

      {/* ── Category tabs ── */}
      <div className="mb-10 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const cfg = CAT_CFG[cat]
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? `${cfg.active} shadow-lg shadow-${cfg.dot}/20 -translate-y-0.5`
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800'
              }`}
            >
              {!isActive && <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} opacity-60`} />}
              {cat}
            </button>
          )
        })}
      </div>

      {loading && <LoadingSpinner message="載入文章中..." />}
      {error && !loading && <ErrorMessage message={`載入失敗：${error}`} onRetry={refetch} />}

      {posts && posts.length > 0 && (
        <div className="space-y-5">

          {/* ── Featured first post ── */}
          <article className="group cursor-pointer relative overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            {/* Left accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 to-amber-500 rounded-l-3xl" />
            {/* Decorative circle */}
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br from-orange-200 to-amber-200 opacity-40 blur-2xl" />

            <div className="pl-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="rounded-full bg-orange-500 text-white px-3 py-0.5 text-xs font-bold shadow-sm">技術</span>
                <span className="text-xs text-gray-400 font-medium">{posts[0].date}</span>
                <span className="ml-auto rounded-full bg-orange-100 text-orange-500 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase">精選</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 group-hover:text-orange-700 transition-colors leading-snug mb-3">
                {posts[0].title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{posts[0].summary}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-bold text-orange-500 group-hover:gap-3 transition-all">
                <span>閱讀全文</span>
                <span>→</span>
              </div>
            </div>
          </article>

          {/* ── Rest of posts ── */}
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.slice(1).map((post) => {
              const { month, day } = formatDate(post.date)
              return (
                <article
                  key={post.id}
                  className="group cursor-pointer relative overflow-hidden flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  {/* Left accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-100 group-hover:bg-gradient-to-b group-hover:from-orange-300 group-hover:to-amber-400 rounded-l-2xl transition-all" />

                  {/* Date column */}
                  <div className="hidden sm:flex flex-col items-center justify-center w-12 flex-shrink-0 rounded-xl bg-gray-50 py-3 group-hover:bg-orange-50 transition-colors">
                    <span className="text-[10px] text-gray-400 font-medium">{month}</span>
                    <span className="text-xl font-black text-gray-800 leading-none">{day}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pl-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="rounded-full bg-orange-100 text-orange-600 px-2 py-0.5 text-[10px] font-semibold">技術</span>
                      <span className="text-[10px] text-gray-400 sm:hidden">{post.date}</span>
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
                </article>
              )
            })}
          </div>

        </div>
      )}

    </PageLayout>
  )
}
