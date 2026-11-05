'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { Page } from '@/types/workspace'
import { useWorkspace } from '@/contexts/WorkspaceContext'

const PRESET_TAGS = ['工作', '個人', '想法', '重要']

const TAG_COLORS: Record<string, string> = {
  工作: 'bg-blue-100 text-blue-700 border-blue-200',
  個人: 'bg-green-100 text-green-700 border-green-200',
  想法: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  重要: 'bg-red-100 text-red-700 border-red-200',
}

function tagColor(tag: string) {
  return TAG_COLORS[tag] ?? 'bg-gray-100 text-gray-600 border-gray-200'
}

export default function PageEditor({ page }: { page: Page }) {
  const { updatePage } = useWorkspace()
  const [title, setTitle] = useState(page.title)
  const [content, setContent] = useState(page.content)
  const [tags, setTags] = useState<string[]>(page.tags ?? [])
  const [tagInput, setTagInput] = useState('')
  const [showTagInput, setShowTagInput] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setTitle(page.title)
    setContent(page.content)
    setTags(page.tags ?? [])
  }, [page.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const scheduleSave = (t: string, c: string, tgs: string[]) => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      updatePage({ ...page, title: t, content: c, tags: tgs })
    }, 1000)
  }

  const handleTitleChange = (val: string) => { setTitle(val); scheduleSave(val, content, tags) }
  const handleContentChange = (val: string) => { setContent(val); scheduleSave(title, val, tags) }

  const addTag = (tag: string) => {
    const t = tag.trim()
    if (!t || tags.includes(t)) return
    const next = [...tags, t]
    setTags(next)
    setTagInput('')
    scheduleSave(title, content, next)
  }

  const removeTag = (tag: string) => {
    const next = tags.filter((t) => t !== tag)
    setTags(next)
    scheduleSave(title, content, next)
  }

  const handleTagKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { addTag(tagInput); return }
    if (e.key === 'Escape') { setShowTagInput(false); setTagInput('') }
  }

  return (
    <div className="flex h-full flex-col px-10 py-8 max-w-3xl mx-auto w-full">
      {/* 標題 */}
      <input
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        placeholder="未命名頁面"
        className="mb-3 w-full border-none bg-transparent text-3xl font-bold text-gray-900 placeholder-gray-300 focus:outline-none"
      />

      {/* 標籤區 */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${tagColor(tag)}`}
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-0.5 opacity-50 hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </span>
        ))}

        {showTagInput ? (
          <div className="relative">
            <input
              autoFocus
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKey}
              onBlur={() => { if (!tagInput) setShowTagInput(false) }}
              placeholder="輸入標籤..."
              className="rounded-full border border-gray-300 px-3 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400 w-24"
            />
            {/* 預設標籤快選 */}
            <div className="absolute top-7 left-0 z-10 flex flex-col gap-1 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
              {PRESET_TAGS.filter((t) => !tags.includes(t) && (!tagInput || t.includes(tagInput))).map((t) => (
                <button
                  key={t}
                  onMouseDown={() => addTag(t)}
                  className={`rounded px-2 py-1 text-left text-xs font-medium ${tagColor(t)} hover:opacity-80 transition-opacity`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowTagInput(true)}
            className="rounded-full border border-dashed border-gray-300 px-2.5 py-0.5 text-xs text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors"
          >
            + 標籤
          </button>
        )}
      </div>

      {/* 內容 */}
      <textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder="開始輸入內容..."
        className="flex-1 w-full resize-none border-none bg-transparent text-sm leading-7 text-gray-700 placeholder-gray-300 focus:outline-none"
      />

      <p className="mt-4 text-right text-xs text-gray-300">
        最後更新：{new Date(page.updatedAt).toLocaleString('zh-TW')}
      </p>
    </div>
  )
}
