'use client'

import { useState, useEffect, useRef } from 'react'
import { Page } from '@/types/workspace'
import { useWorkspace } from '@/contexts/WorkspaceContext'

interface PageEditorProps {
  page: Page
}

export default function PageEditor({ page }: PageEditorProps) {
  const { updatePage } = useWorkspace()
  const [title, setTitle] = useState(page.title)
  const [content, setContent] = useState(page.content)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 當外部傳入 page 改變（切換頁面）時重設
  useEffect(() => {
    setTitle(page.title)
    setContent(page.content)
  }, [page.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // 自動儲存（防抖 1 秒）
  const scheduleSave = (newTitle: string, newContent: string) => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      updatePage({ ...page, title: newTitle, content: newContent })
    }, 1000)
  }

  const handleTitleChange = (val: string) => {
    setTitle(val)
    scheduleSave(val, content)
  }

  const handleContentChange = (val: string) => {
    setContent(val)
    scheduleSave(title, val)
  }

  return (
    <div className="flex h-full flex-col px-10 py-8 max-w-3xl mx-auto w-full">
      {/* 標題 */}
      <input
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        placeholder="未命名頁面"
        className="mb-6 w-full border-none bg-transparent text-3xl font-bold text-gray-900 placeholder-gray-300 focus:outline-none"
      />

      {/* 內容 */}
      <textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder="開始輸入內容..."
        className="flex-1 w-full resize-none border-none bg-transparent text-sm leading-7 text-gray-700 placeholder-gray-300 focus:outline-none"
      />

      {/* 底部資訊 */}
      <p className="mt-4 text-right text-xs text-gray-300">
        最後更新：{new Date(page.updatedAt).toLocaleString('zh-TW')}
      </p>
    </div>
  )
}
