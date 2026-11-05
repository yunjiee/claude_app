'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { Page, CalendarEvent } from '@/types/workspace'
import * as store from '@/lib/workspace/store'

interface WorkspaceContextValue {
  pages: Page[]
  events: CalendarEvent[]
  createPage: () => Page
  updatePage: (page: Page) => void
  deletePage: (id: string) => void
  reorderPages: (ids: string[]) => void
  createEvent: (event: Omit<CalendarEvent, 'id'>) => CalendarEvent
  updateEvent: (event: CalendarEvent) => void
  deleteEvent: (id: string) => void
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null)

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<Page[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])

  useEffect(() => {
    setPages(store.getPages())
    setEvents(store.getEvents())
  }, [])

  const createPage = useCallback((): Page => {
    const page: Page = {
      id: store.generateId(),
      title: '未命名頁面',
      content: '',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    store.savePage(page)
    setPages((prev) => [...prev, page])
    return page
  }, [])

  const updatePage = useCallback((page: Page) => {
    const updated = { ...page, updatedAt: new Date().toISOString() }
    store.savePage(updated)
    setPages((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
  }, [])

  const deletePage = useCallback((id: string) => {
    store.deletePage(id)
    setPages((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const reorderPages = useCallback((ids: string[]) => {
    store.reorderPages(ids)
    setPages((prev) => {
      const map = new Map(prev.map((p) => [p.id, p]))
      return ids.map((id) => map.get(id)).filter(Boolean) as Page[]
    })
  }, [])

  const createEvent = useCallback((data: Omit<CalendarEvent, 'id'>): CalendarEvent => {
    const event: CalendarEvent = { id: store.generateId(), ...data }
    store.saveEvent(event)
    setEvents((prev) => [...prev, event])
    return event
  }, [])

  const updateEvent = useCallback((event: CalendarEvent) => {
    store.saveEvent(event)
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)))
  }, [])

  const deleteEvent = useCallback((id: string) => {
    store.deleteEvent(id)
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }, [])

  return (
    <WorkspaceContext.Provider
      value={{ pages, events, createPage, updatePage, deletePage, reorderPages, createEvent, updateEvent, deleteEvent }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext)
  if (!ctx) throw new Error('useWorkspace must be used inside WorkspaceProvider')
  return ctx
}
