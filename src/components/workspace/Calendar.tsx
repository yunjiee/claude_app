'use client'

import { useState, useEffect, useRef } from 'react'
import { useWorkspace } from '@/contexts/WorkspaceContext'
import { CalendarEvent, EventColor } from '@/types/workspace'

/* ── helpers ── */
const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']
const MONTHS = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']

function toYMD(d: Date) { return d.toISOString().slice(0, 10) }
function ymd(y: number, m: number, day: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

/* ── colour palette ── */
const COLOR_CFG: Record<EventColor, { dot: string; pill: string; label: string }> = {
  blue:   { dot: 'bg-blue-500',   pill: 'bg-blue-100 text-blue-700',    label: '藍' },
  green:  { dot: 'bg-emerald-500',pill: 'bg-emerald-100 text-emerald-700',label: '綠' },
  red:    { dot: 'bg-red-500',    pill: 'bg-red-100 text-red-700',      label: '紅' },
  yellow: { dot: 'bg-yellow-400', pill: 'bg-yellow-100 text-yellow-700', label: '黃' },
  purple: { dot: 'bg-violet-500', pill: 'bg-violet-100 text-violet-700', label: '紫' },
  orange: { dot: 'bg-orange-500', pill: 'bg-orange-100 text-orange-700', label: '橘' },
  gray:   { dot: 'bg-gray-400',   pill: 'bg-gray-100 text-gray-600',    label: '灰' },
}
const COLOR_OPTIONS = Object.keys(COLOR_CFG) as EventColor[]

/* ── Add/Edit modal ── */
interface ModalProps {
  initialDate: string
  event?: CalendarEvent
  onSave: (data: Omit<CalendarEvent, 'id'>) => void
  onDelete?: () => void
  onClose: () => void
}

function EventModal({ initialDate, event, onSave, onDelete, onClose }: ModalProps) {
  const [title, setTitle]   = useState(event?.title ?? '')
  const [date, setDate]     = useState(event?.date ?? initialDate)
  const [time, setTime]     = useState(event?.time ?? '')
  const [endTime, setEnd]   = useState(event?.endTime ?? '')
  const [note, setNote]     = useState(event?.note ?? '')
  const [color, setColor]   = useState<EventColor>(event?.color ?? 'blue')
  const titleRef = useRef<HTMLInputElement>(null)

  useEffect(() => { titleRef.current?.focus() }, [])

  const handleSave = () => {
    if (!title.trim()) return
    onSave({ title: title.trim(), date, time: time || undefined, endTime: endTime || undefined, note: note || undefined, color })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm">{event ? '編輯行程' : '新增行程'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
        </div>

        <div className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">標題 *</label>
            <input
              ref={titleRef}
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSave() }}
              placeholder="行程名稱..."
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Date + Time row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1">日期</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">開始</label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">結束</label>
              <input
                type="time"
                value={endTime}
                onChange={e => setEnd(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Color picker */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">顏色標籤</label>
            <div className="flex gap-2 flex-wrap">
              {COLOR_OPTIONS.map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  title={COLOR_CFG[c].label}
                  className={`w-7 h-7 rounded-full ${COLOR_CFG[c].dot} transition-all ${color === c ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'opacity-60 hover:opacity-100'}`}
                />
              ))}
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">備註</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="備註說明（選填）..."
              rows={2}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 pb-5">
          <div>
            {onDelete && (
              <button onClick={() => { onDelete(); onClose() }} className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors">
                刪除行程
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors">
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="rounded-xl px-4 py-2 text-xs font-bold bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40 transition-colors"
            >
              {event ? '儲存' : '新增'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main Calendar ── */
export default function Calendar() {
  const { events, createEvent, updateEvent, deleteEvent } = useWorkspace()
  const [current, setCurrent] = useState({ year: 2024, month: 0 })
  const [today, setToday] = useState('')
  const [modal, setModal] = useState<{ date: string; event?: CalendarEvent } | null>(null)
  const [view, setView] = useState<'month' | 'list'>('month')

  useEffect(() => {
    const now = new Date()
    setCurrent({ year: now.getFullYear(), month: now.getMonth() })
    setToday(toYMD(now))
  }, [])

  const { year, month } = current
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const eventsByDate = events.reduce<Record<string, CalendarEvent[]>>((acc, e) => {
    if (!acc[e.date]) acc[e.date] = []
    acc[e.date].push(e)
    return acc
  }, {})

  const prevMonth = () => setCurrent(c => { const d = new Date(c.year, c.month - 1); return { year: d.getFullYear(), month: d.getMonth() } })
  const nextMonth = () => setCurrent(c => { const d = new Date(c.year, c.month + 1); return { year: d.getFullYear(), month: d.getMonth() } })
  const goToday  = () => { const now = new Date(); setCurrent({ year: now.getFullYear(), month: now.getMonth() }) }

  const monthEvents = events
    .filter(e => e.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`))
    .sort((a, b) => (a.date + (a.time ?? '')).localeCompare(b.date + (b.time ?? '')))

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="flex h-full flex-col">
      {/* ── Top bar ── */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100 bg-white">
        <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors text-lg">‹</button>
        <h2 className="text-sm font-bold text-gray-900 min-w-[7rem] text-center">
          {year} · {MONTHS[month]}
        </h2>
        <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors text-lg">›</button>

        <button onClick={goToday} className="ml-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">今天</button>

        <div className="ml-auto flex gap-1">
          <button onClick={() => setView('month')} className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${view === 'month' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-100'}`}>月</button>
          <button onClick={() => setView('list')}  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${view === 'list'  ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-100'}`}>列表</button>
        </div>

        <button
          onClick={() => setModal({ date: today || toYMD(new Date()) })}
          className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-3 py-1.5 transition-colors shadow-sm"
        >
          + 新增行程
        </button>
      </div>

      {/* ── Month view ── */}
      {view === 'month' && (
        <div className="flex-1 overflow-auto p-3">
          <div className="mb-1 grid grid-cols-7 text-center">
            {WEEKDAYS.map(d => (
              <div key={d} className="py-1 text-[11px] font-semibold text-gray-400">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={`e-${i}`} />
              const dateStr = ymd(year, month, day)
              const dayEvs = eventsByDate[dateStr] ?? []
              const isToday = dateStr === today
              return (
                <div
                  key={dateStr}
                  className={`min-h-[64px] rounded-xl p-1.5 cursor-pointer transition-all group hover:shadow-sm ${
                    isToday ? 'bg-blue-50 ring-1 ring-blue-300' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setModal({ date: dateStr })}
                >
                  <span className={`block text-[11px] font-bold mb-1 w-5 h-5 flex items-center justify-center rounded-full ${
                    isToday ? 'bg-blue-500 text-white' : 'text-gray-700'
                  }`}>{day}</span>

                  <div className="space-y-0.5">
                    {dayEvs.slice(0, 3).map(ev => (
                      <div
                        key={ev.id}
                        onClick={e => { e.stopPropagation(); setModal({ date: dateStr, event: ev }) }}
                        className={`truncate rounded-md px-1.5 py-0.5 text-[10px] font-medium leading-4 cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1 ${COLOR_CFG[ev.color].pill}`}
                      >
                        {ev.time && <span className="opacity-60 flex-shrink-0">{ev.time.slice(0, 5)}</span>}
                        <span className="truncate">{ev.title}</span>
                      </div>
                    ))}
                    {dayEvs.length > 3 && (
                      <div className="text-[10px] text-gray-400 pl-1">+{dayEvs.length - 3} 更多</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── List view ── */}
      {view === 'list' && (
        <div className="flex-1 overflow-auto p-4">
          {monthEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-3">
              <div className="text-3xl">📅</div>
              <p className="text-sm text-gray-400">本月沒有行程</p>
              <button
                onClick={() => setModal({ date: today || toYMD(new Date()) })}
                className="text-xs text-blue-500 font-semibold hover:text-blue-700 transition-colors"
              >
                + 新增第一個行程
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {monthEvents.map(ev => (
                <div
                  key={ev.id}
                  onClick={() => setModal({ date: ev.date, event: ev })}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 cursor-pointer hover:shadow-md hover:border-gray-200 transition-all group"
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${COLOR_CFG[ev.color].dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900">{ev.title}</span>
                      {ev.time && (
                        <span className="text-xs text-gray-400 font-mono">
                          {ev.time}{ev.endTime ? ` – ${ev.endTime}` : ''}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {ev.date.replace(/-/g, ' / ')}
                    </p>
                    {ev.note && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{ev.note}</p>}
                  </div>
                  <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 flex-shrink-0 ${COLOR_CFG[ev.color].pill}`}>
                    {COLOR_CFG[ev.color].label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Modal ── */}
      {modal && (
        <EventModal
          initialDate={modal.date}
          event={modal.event}
          onSave={data => modal.event ? updateEvent({ ...data, id: modal.event.id }) : createEvent(data)}
          onDelete={modal.event ? () => deleteEvent(modal.event!.id) : undefined}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
