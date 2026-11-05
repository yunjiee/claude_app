import PageLayout from '@/components/layout/PageLayout'

// 範例資料 — 之後替換為 blogApi.getPosts() 呼叫
const mockPosts = [
  { id: '1', title: '第一篇文章', date: '2024-01-01', summary: '這是文章摘要...' },
  { id: '2', title: '第二篇文章', date: '2024-01-15', summary: '這是文章摘要...' },
]

export default function BlogPage() {
  return (
    <PageLayout title="📝 部落格" description="文章與知識分享">
      <div className="space-y-6">
        {mockPosts.map((post) => (
          <article key={post.id} className="rounded-xl border border-gray-200 p-6 hover:border-gray-400 transition-colors">
            <p className="text-xs text-gray-400">{post.date}</p>
            <h2 className="mt-1 text-lg font-semibold text-gray-900">{post.title}</h2>
            <p className="mt-2 text-sm text-gray-500">{post.summary}</p>
          </article>
        ))}
      </div>
    </PageLayout>
  )
}
