'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useWorkspace } from '@/contexts/WorkspaceContext'
import { Page } from '@/types/workspace'

export default function Sidebar() {
  const { pages, createPage, deletePage, updatePage } = useWorkspace()
  const pathname = usePathname()
  const router = useRouter()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')

  const handleCreate = () => {
    const page = createPage()
    router.push(`/workspace/page/${page.id}`)
  }

  const startEdit = (id: string, currentTitle: string) => {
    setEditingId(id)
    setEditTitle(currentTitle)
  }

  const commitEdit = (page: Page) => {
    updatePage({ ...page, title: editTitle.trim() || '未命名頁面' })
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    deletePage(id)
    if (pathname === `/workspace/page/${id}`) router.push('/workspace')
  }

  return (
    <aside className="flex h-full w-56 flex-shrink-0 flex-col border-r border-gray-200 bg-gray-50">
      {/* 標題 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">頁面</span>
        <button
          onClick={handleCreate}
          title="新增頁面"
          className="flex h-6 w-6 items-center justify-center rounded hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition-colors text-lg leading-none"
        >
          +
        </button>
      </div>

      {/* 日曆入口 */}
      <Link
        href="/workspace"
        className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
          pathname === '/workspace'
            ? 'bg-gray-200 text-gray-900 font-medium'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <span>📅</span>
        <span>日曆</span>
      </Link>

      <div className="my-1 border-t border-gray-200" />

      {/* 頁面清單 */}
      <ul className="flex-1 overflow-y-auto py-1">
        {pages.map((page) => {
          const isActive = pathname === `/workspace/page/${page.id}`
          return (
            <li key={page.id} className="group relative">
              {editingId === page.id ? (
                <input
                  autoFocus
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={() => commitEdit(page)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitEdit(page)
                    if (e.key === 'Escape') setEditingId(null)
                  }}
                  className="mx-2 w-[calc(100%-1rem)] rounded border border-gray-300 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              ) : (
                <Link
                  href={`/workspace/page/${page.id}`}
                  onDoubleClick={(e) => { e.preventDefault(); startEdit(page.id, page.title) }}
                  className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors pr-8 ${
                    isActive
                      ? 'bg-gray-200 text-gray-900 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>📄</span>
                  <span className="truncate">{page.title}</span>
                </Link>
              )}

              {/* 刪除按鈕（hover 顯示） */}
              {editingId !== page.id && (
                <button
                  onClick={() => handleDelete(page.id)}
                  title="刪除頁面"
                  className="absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 w-5 items-center justify-center rounded text-gray-400 hover:bg-red-100 hover:text-red-500 group-hover:flex transition-colors text-xs"
                >
                  ✕
                </button>
              )}
            </li>
          )
        })}

        {pages.length === 0 && (
          <li className="px-4 py-6 text-center text-xs text-gray-400">
            還沒有頁面<br />點上方 + 新增
          </li>
        )}
      </ul>
    </aside>
  )
}
