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

export default function BlogPage() {
  const { data: posts, loading, error, refetch } = useApi<Post[]>('/api/blog/posts')

  return (
    <PageLayout title="📝 部落格" description="文章與知識分享">
      {loading && <LoadingSpinner message="載入文章中..." />}

      {error && !loading && (
        <ErrorMessage message={`載入失敗：${error}`} onRetry={refetch} />
      )}

      {posts && (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl border border-gray-200 p-6 hover:border-gray-400 transition-colors"
            >
              <p className="text-xs text-gray-400">{post.date}</p>
              <h2 className="mt-1 text-lg font-semibold text-gray-900">{post.title}</h2>
              <p className="mt-2 text-sm text-gray-500">{post.summary}</p>
            </article>
          ))}
        </div>
      )}
    </PageLayout>
  )
}
