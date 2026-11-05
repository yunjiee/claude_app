'use client'

import { useState, useEffect } from 'react'
import { useWorkspace } from '@/contexts/WorkspaceContext'
import { CalendarEvent } from '@/types/workspace'

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

function toYMD(date: Date) {
  return date.toISOString().slice(0, 10)
}

export default function Calendar() {
  const { events, createEvent, deleteEvent } = useWorkspace()
  const [current, setCurrent] = useState({ year: 2024, month: 0 })
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [newEventTitle, setNewEventTitle] = useState('')
  const [today, setToday] = useState('')

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

  const prevMonth = () => setCurrent((c) => {
    const d = new Date(c.year, c.month - 1)
    return { year: d.getFullYear(), month: d.getMonth() }
  })

  const nextMonth = () => setCurrent((c) => {
    const d = new Date(c.year, c.month + 1)
    return { year: d.getFullYear(), month: d.getMonth() }
  })

  const handleDayClick = (dateStr: string) => {
    setSelectedDate(dateStr === selectedDate ? null : dateStr)
    setNewEventTitle('')
  }

  const handleAddEvent = () => {
    if (!selectedDate || !newEventTitle.trim()) return
    createEvent(selectedDate, newEventTitle.trim())
    setNewEventTitle('')
  }

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="flex h-full flex-col">
      {/* 月份標題 */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <button onClick={prevMonth} className="rounded p-1.5 hover:bg-gray-100 text-gray-500 transition-colors">‹</button>
        <h2 className="text-base font-semibold text-gray-900">
          {year} 年 {month + 1} 月
        </h2>
        <button onClick={nextMonth} className="rounded p-1.5 hover:bg-gray-100 text-gray-500 transition-colors">›</button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 月曆格 */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* 星期標題 */}
          <div className="mb-1 grid grid-cols-7 text-center">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-1 text-xs font-medium text-gray-400">{d}</div>
            ))}
          </div>

          {/* 日期格 */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              const dayEvents = eventsByDate[dateStr] ?? []
              const isToday = dateStr === today
              const isSelected = dateStr === selectedDate

              return (
                <button
                  key={dateStr}
                  onClick={() => handleDayClick(dateStr)}
                  className={`relative min-h-[52px] rounded-lg p-1.5 text-left text-sm transition-colors ${
                    isSelected
                      ? 'bg-gray-900 text-white'
                      : isToday
                      ? 'bg-gray-100 font-semibold text-gray-900 ring-1 ring-gray-300'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="block text-xs font-medium">{day}</span>
                  <div className="mt-0.5 space-y-0.5">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className={`truncate rounded px-1 text-[10px] leading-4 ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className={`text-[10px] ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
                        +{dayEvents.length - 2} 更多
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* 右側：選取日期的事件面板 */}
        {selectedDate && (
          <div className="w-56 flex-shrink-0 border-l border-gray-200 p-4 overflow-y-auto">
            <p className="text-sm font-semibold text-gray-900 mb-3">
              {selectedDate.replace(/-/g, ' / ')}
            </p>

            {/* 新增事件 */}
            <div className="flex gap-1 mb-4">
              <input
                autoFocus
                placeholder="新增備忘..."
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAddEvent() }}
                className="flex-1 min-w-0 rounded border border-gray-300 px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <button
                onClick={handleAddEvent}
                disabled={!newEventTitle.trim()}
                className="rounded bg-gray-900 px-2 py-1 text-xs text-white hover:bg-gray-700 disabled:opacity-40 transition-colors"
              >
                +
              </button>
            </div>

            {/* 該日事件列表 */}
            <ul className="space-y-1">
              {(eventsByDate[selectedDate] ?? []).map((ev) => (
                <li key={ev.id} className="group flex items-start justify-between gap-1 rounded bg-gray-50 px-2 py-1.5">
                  <span className="text-xs text-gray-700 leading-relaxed">{ev.title}</span>
                  <button
                    onClick={() => deleteEvent(ev.id)}
                    className="mt-0.5 hidden text-gray-300 hover:text-red-500 group-hover:block transition-colors text-xs flex-shrink-0"
                  >
                    ✕
                  </button>
                </li>
              ))}
              {!(eventsByDate[selectedDate]?.length) && (
                <li className="text-xs text-gray-400 text-center py-2">尚無備忘</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
