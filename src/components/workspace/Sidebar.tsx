'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { useWorkspace } from '@/contexts/WorkspaceContext'
import { Page } from '@/types/workspace'

const TAG_COLORS: Record<string, string> = {
  工作: 'bg-blue-100 text-blue-700',
  個人: 'bg-green-100 text-green-700',
  想法: 'bg-yellow-100 text-yellow-700',
  重要: 'bg-red-100 text-red-700',
}

function tagColor(tag: string) {
  return TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600'
}

export default function Sidebar() {
  const { pages, createPage, deletePage, updatePage, reorderPages } = useWorkspace()
  const pathname = usePathname()
  const router = useRouter()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const dragSrc = useRef<string | null>(null)
  const [dragOver, setDragOver] = useState<string | null>(null)

  const handleCreate = () => {
    const page = createPage()
    router.push(`/workspace/page/${page.id}`)
  }

  const startEdit = (id: string, title: string) => { setEditingId(id); setEditTitle(title) }

  const commitEdit = (page: Page) => {
    updatePage({ ...page, title: editTitle.trim() || '未命名頁面' })
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    deletePage(id)
    if (pathname === `/workspace/page/${id}`) router.push('/workspace')
  }

  // --- Drag & Drop ---
  const onDragStart = (id: string) => { dragSrc.current = id }

  const onDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    if (dragSrc.current !== id) setDragOver(id)
  }

  const onDrop = (targetId: string) => {
    if (!dragSrc.current || dragSrc.current === targetId) return
    const ids = pages.map((p) => p.id)
    const from = ids.indexOf(dragSrc.current)
    const to = ids.indexOf(targetId)
    const reordered = [...ids]
    reordered.splice(from, 1)
    reordered.splice(to, 0, dragSrc.current)
    reorderPages(reordered)
    dragSrc.current = null
    setDragOver(null)
  }

  const onDragEnd = () => { dragSrc.current = null; setDragOver(null) }

  return (
    <aside className="flex h-full w-60 flex-shrink-0 flex-col border-r border-gray-200 bg-gray-50">
      {/* 標題列 */}
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

      {/* 頁面清單（可拖曳） */}
      <ul className="flex-1 overflow-y-auto py-1">
        {pages.map((page) => {
          const isActive = pathname === `/workspace/page/${page.id}`
          const isDragTarget = dragOver === page.id

          return (
            <li
              key={page.id}
              draggable
              onDragStart={() => onDragStart(page.id)}
              onDragOver={(e) => onDragOver(e, page.id)}
              onDrop={() => onDrop(page.id)}
              onDragEnd={onDragEnd}
              className={`group relative transition-all ${isDragTarget ? 'border-t-2 border-blue-400' : ''}`}
            >
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
                  className={`flex flex-col px-4 py-2 text-sm transition-colors pr-8 cursor-grab active:cursor-grabbing ${
                    isActive
                      ? 'bg-gray-200 text-gray-900 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs select-none">⠿</span>
                    <span className="truncate">📄 {page.title}</span>
                  </span>
                  {page.tags.length > 0 && (
                    <div className="mt-1 ml-5 flex flex-wrap gap-1">
                      {page.tags.map((tag) => (
                        <span key={tag} className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${tagColor(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              )}

              {editingId !== page.id && (
                <button
                  onClick={() => handleDelete(page.id)}
                  title="刪除"
                  className="absolute right-2 top-2.5 hidden h-5 w-5 items-center justify-center rounded text-gray-400 hover:bg-red-100 hover:text-red-500 group-hover:flex transition-colors text-xs"
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
