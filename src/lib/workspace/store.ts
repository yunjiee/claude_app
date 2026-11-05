import { WorkspaceData, Page, CalendarEvent } from '@/types/workspace'

const STORAGE_KEY = 'workspace_data'

const DEFAULT_DATA: WorkspaceData = {
  pages: [
    {
      id: 'welcome',
      title: '歡迎使用',
      content: '這是你的第一個頁面。\n\n點擊左側「+ 新增頁面」來建立更多頁面，或點擊日曆上的日期新增備忘。',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  events: [],
}

function load(): WorkspaceData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as WorkspaceData) : DEFAULT_DATA
  } catch {
    return DEFAULT_DATA
  }
}

function save(data: WorkspaceData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage 滿了或隱私模式下忽略
  }
}

// --- Pages ---
export function getPages(): Page[] {
  return load().pages
}

export function savePage(page: Page): void {
  const data = load()
  const idx = data.pages.findIndex((p) => p.id === page.id)
  if (idx >= 0) data.pages[idx] = page
  else data.pages.push(page)
  save(data)
}

export function deletePage(id: string): void {
  const data = load()
  data.pages = data.pages.filter((p) => p.id !== id)
  save(data)
}

export function reorderPages(ids: string[]): void {
  const data = load()
  const map = new Map(data.pages.map((p) => [p.id, p]))
  data.pages = ids.map((id) => map.get(id)).filter(Boolean) as Page[]
  save(data)
}

// --- Events ---
export function getEvents(): CalendarEvent[] {
  const data = load()
  // 去除 title+date+time 完全相同的重複行程（保留最後建立的那筆）
  const seen = new Map<string, CalendarEvent>()
  for (const e of data.events) {
    const key = `${e.title}|${e.date}|${e.time ?? ''}|${e.endTime ?? ''}`
    seen.set(key, e)
  }
  const deduped = Array.from(seen.values())
  // 若有去除，同步回 localStorage
  if (deduped.length !== data.events.length) {
    data.events = deduped
    save(data)
  }
  return deduped
}

export function saveEvent(event: CalendarEvent): void {
  const data = load()
  const idx = data.events.findIndex((e) => e.id === event.id)
  if (idx >= 0) data.events[idx] = event
  else data.events.push(event)
  save(data)
}

export function deleteEvent(id: string): void {
  const data = load()
  data.events = data.events.filter((e) => e.id !== id)
  save(data)
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}
