export interface Page {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
  linkedEventId?: string  // 連動的日曆行程 ID
}

export interface CalendarEvent {
  id: string
  title: string
  date: string        // YYYY-MM-DD
  time?: string       // HH:MM (optional)
  endTime?: string    // HH:MM (optional)
  note?: string       // 備註
  color: EventColor
}

export type EventColor = 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange'

export interface WorkspaceData {
  pages: Page[]
  events: CalendarEvent[]
}
