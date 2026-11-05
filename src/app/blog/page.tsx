'use client'

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

export default function BlogPage() {
  const { data: posts, loading, error, refetch } = useApi<Post[]>('/api/blog/posts')

  return (
    <PageLayout title="部落格" description="文章與知識分享">
      {/* 分類篩選 */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              i === 0
                ? 'bg-gray-900 text-white'
                : 'border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <LoadingSpinner message="載入文章中..." />}
      {error && !loading && <ErrorMessage message={`載入失敗：${error}`} onRetry={refetch} />}

      {posts && (
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex gap-6 rounded-2xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
            >
              {/* 日期欄 */}
              <div className="hidden sm:flex flex-col items-center justify-center w-14 flex-shrink-0 rounded-xl bg-gray-50 py-3">
                <span className="text-xs text-gray-400">{post.date.slice(5, 7)}月</span>
                <span className="text-xl font-bold text-gray-900 leading-none">{post.date.slice(8)}</span>
              </div>

              {/* 內容 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700">技術</span>
                  <span className="text-xs text-gray-400 sm:hidden">{post.date}</span>
                </div>
                <h2 className="text-base font-semibold text-gray-900 group-hover:text-black transition-colors">
                  {post.title}
                </h2>
                <p className="mt-1.5 text-sm text-gray-500 leading-relaxed line-clamp-2">{post.summary}</p>
              </div>

              <div className="hidden sm:flex items-center text-gray-300 group-hover:text-gray-500 transition-colors text-lg">
                →
              </div>
            </article>
          ))}
        </div>
      )}
    </PageLayout>
  )
}
