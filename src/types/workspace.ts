export interface Page {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface CalendarEvent {
  id: string
  title: string
  date: string   // YYYY-MM-DD
  color: EventColor
}

export type EventColor = 'gray' | 'blue' | 'green' | 'red' | 'yellow'

export interface WorkspaceData {
  pages: Page[]
  events: CalendarEvent[]
}
