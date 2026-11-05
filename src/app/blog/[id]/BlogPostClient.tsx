'use client'

import Link from 'next/link'
import { BlogPost, CAT_CFG, POSTS } from '@/lib/blog/posts'

function renderContent(content: string) {
  return content.split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) {
      return <h2 key={i} className="text-lg font-black text-gray-900 mt-8 mb-3">{block.slice(3)}</h2>
    }
    if (block.startsWith('```')) {
      const lines = block.split('\n')
      const code = lines.slice(1, -1).join('\n')
      return (
        <pre key={i} className="my-4 overflow-x-auto rounded-xl bg-gray-900 px-5 py-4 text-xs leading-6 text-green-300">
          <code>{code}</code>
        </pre>
      )
    }
    return <p key={i} className="text-sm leading-8 text-gray-600">{block}</p>
  })
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const catCfg = CAT_CFG[post.category]
  const related = POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${post.coverGradient} py-16`}>
        <div className="max-w-2xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-white/70 mb-6">
            <Link href="/blog" className="hover:text-white transition-colors">部落格</Link>
            <span>/</span>
            <span className="text-white font-medium">{post.category}</span>
          </nav>
          <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold mb-4 bg-white/20 text-white`}>
            {post.category}
          </span>
          <h1 className="text-3xl font-black text-white leading-tight mb-4">{post.title}</h1>
          <p className="text-white/80 text-sm leading-relaxed mb-6">{post.summary}</p>
          <div className="flex items-center gap-4 text-white/60 text-xs">
            <span>✍️ {post.author}</span>
            <span>📅 {post.date}</span>
            <span>⏱ {post.readTime} 分鐘</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <article className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-10 space-y-2">
          {renderContent(post.content)}
        </article>

        {/* 相關文章 */}
        {related.length > 0 && (
          <section>
            <h2 className="text-sm font-black text-gray-900 mb-4">相關文章</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map(p => (
                <Link
                  key={p.id}
                  href={`/blog/${p.id}`}
                  className="group flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${p.coverGradient} flex items-center justify-center text-white text-sm font-bold`}>
                    {p.category[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-900 leading-snug group-hover:text-gray-600 transition-colors line-clamp-2">{p.title}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{p.date} · {p.readTime} 分鐘</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
            ← 回到部落格
          </Link>
        </div>
      </div>
    </main>
  )
}
