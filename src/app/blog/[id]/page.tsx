import { POSTS } from '@/lib/blog/posts'
import BlogPostClient from './BlogPostClient'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return POSTS.map(p => ({ id: p.id }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = POSTS.find(p => p.id === id)
  if (!post) notFound()
  return <BlogPostClient post={post} />
}
