'use client'

import { useState, useEffect, useRef, KeyboardEvent } from 'react'
import { Page } from '@/types/workspace'
import { EventColor } from '@/types/workspace'
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

function toYMD(d: Date) { return d.toISOString().slice(0, 10) }

const CAL_COLORS: { value: EventColor; dot: string; label: string }[] = [
  { value: 'blue',   dot: 'bg-blue-500',    label: '藍' },
  { value: 'green',  dot: 'bg-emerald-500', label: '綠' },
  { value: 'red',    dot: 'bg-red-500',     label: '紅' },
  { value: 'yellow', dot: 'bg-yellow-400',  label: '黃' },
  { value: 'purple', dot: 'bg-violet-500',  label: '紫' },
  { value: 'orange', dot: 'bg-orange-500',  label: '橘' },
  { value: 'gray',   dot: 'bg-gray-400',    label: '灰' },
]

export default function PageEditor({ page }: { page: Page }) {
  const { updatePage, createEvent, updateEvent, deleteEvent, events } = useWorkspace()

  const [title, setTitle]     = useState(page.title)
  const [content, setContent] = useState(page.content)
  const [tags, setTags]       = useState<string[]>(page.tags ?? [])
  const [tagInput, setTagInput]       = useState('')
  const [showTagInput, setShowTagInput] = useState(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Calendar link state
  const linkedEvent = page.linkedEventId ? events.find(e => e.id === page.linkedEventId) : null
  const [calEnabled, setCalEnabled] = useState(!!page.linkedEventId)
  const [calDate, setCalDate]       = useState(linkedEvent?.date ?? toYMD(new Date()))
  const [calTime, setCalTime]       = useState(linkedEvent?.time ?? '')
  const [calEndTime, setCalEnd]     = useState(linkedEvent?.endTime ?? '')
  const [calColor, setCalColor]     = useState<EventColor>(linkedEvent?.color ?? 'blue')

  // Keep ref for latest linked event id (closure-safe)
  const linkedIdRef = useRef(page.linkedEventId)
  useEffect(() => { linkedIdRef.current = page.linkedEventId }, [page.linkedEventId])

  useEffect(() => {
    setTitle(page.title)
    setContent(page.content)
    setTags(page.tags ?? [])
    const ev = page.linkedEventId ? events.find(e => e.id === page.linkedEventId) : null
    setCalEnabled(!!page.linkedEventId)
    if (ev) {
      setCalDate(ev.date)
      setCalTime(ev.time ?? '')
      setCalEnd(ev.endTime ?? '')
      setCalColor(ev.color)
    }
  }, [page.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const scheduleSave = (t: string, c: string, tgs: string[]) => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      updatePage({ ...page, title: t, content: c, tags: tgs })
      // 若有連動行程，同步更新標題
      if (linkedIdRef.current) {
        const ev = events.find(e => e.id === linkedIdRef.current)
        if (ev) updateEvent({ ...ev, title: t })
      }
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

  // ── Calendar link ──

  const calTimeError = calTime && calEndTime && calEndTime <= calTime

  const syncCalEvent = (date: string, time: string, endTime: string, color: EventColor) => {
    if (!linkedIdRef.current) return
    updateEvent({
      id: linkedIdRef.current,
      title,
      date,
      time: time || undefined,
      endTime: endTime || undefined,
      color,
    })
  }

  const handleCalToggle = () => {
    if (calEnabled) {
      // 關閉連動 → 刪除行程
      if (linkedIdRef.current) {
        deleteEvent(linkedIdRef.current)
        linkedIdRef.current = undefined
        updatePage({ ...page, title, content, tags, linkedEventId: undefined })
      }
      setCalEnabled(false)
    } else {
      // 開啟連動 → 建立行程
      const ev = createEvent({
        title,
        date: calDate,
        time: calTime || undefined,
        endTime: calEndTime || undefined,
        color: calColor,
      })
      linkedIdRef.current = ev.id
      updatePage({ ...page, title, content, tags, linkedEventId: ev.id })
      setCalEnabled(true)
    }
  }

  const handleCalDate = (v: string) => { setCalDate(v); syncCalEvent(v, calTime, calEndTime, calColor) }
  const handleCalTime = (v: string) => { setCalTime(v); if (!calTimeError) syncCalEvent(calDate, v, calEndTime, calColor) }
  const handleCalEnd  = (v: string) => { setCalEnd(v);  if (!calTimeError) syncCalEvent(calDate, calTime, v, calColor) }
  const handleCalColor = (c: EventColor) => { setCalColor(c); syncCalEvent(calDate, calTime, calEndTime, c) }

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
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${tagColor(tag)}`}
          >
            {tag}
            <button onClick={() => removeTag(tag)} className="ml-0.5 opacity-50 hover:opacity-100 transition-opacity">×</button>
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

      {/* ── 連動日曆區塊 ── */}
      <div className={`mb-5 rounded-xl border transition-colors ${calEnabled ? 'border-blue-200 bg-blue-50' : 'border-gray-100 bg-gray-50'} p-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">📅</span>
            <span className="text-xs font-semibold text-gray-700">加入日曆</span>
            {calEnabled && (
              <span className="rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5">✓ 已連動</span>
            )}
          </div>
          {/* Toggle */}
          <button
            onClick={handleCalToggle}
            className={`relative w-9 h-5 rounded-full transition-colors ${calEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${calEnabled ? 'translate-x-4' : ''}`} />
          </button>
        </div>

        {calEnabled && (
          <div className="mt-3 space-y-3">
            {/* 日期 + 時間 */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 mb-1">日期</label>
                <input
                  type="date"
                  value={calDate}
                  onChange={e => handleCalDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 mb-1">開始</label>
                <input
                  type="time"
                  value={calTime}
                  onChange={e => handleCalTime(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 mb-1">結束</label>
                <input
                  type="time"
                  value={calEndTime}
                  onChange={e => handleCalEnd(e.target.value)}
                  className={`w-full rounded-lg border px-2 py-1.5 text-xs focus:outline-none focus:ring-2 ${calTimeError ? 'border-red-300 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-400'}`}
                />
              </div>
            </div>
            {calTimeError && (
              <p className="text-xs text-red-500">結束時間不能早於或等於開始時間</p>
            )}

            {/* 顏色 */}
            <div>
              <label className="block text-[10px] font-semibold text-gray-500 mb-1.5">顏色標籤</label>
              <div className="flex gap-2">
                {CAL_COLORS.map(c => (
                  <button
                    key={c.value}
                    onClick={() => handleCalColor(c.value)}
                    title={c.label}
                    className={`w-6 h-6 rounded-full ${c.dot} transition-all ${calColor === c.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'opacity-60 hover:opacity-100'}`}
                  />
                ))}
              </div>
            </div>
          </div>
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
