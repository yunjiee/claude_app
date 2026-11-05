'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface DarkModeContextValue {
  isDark: boolean
  toggle: () => void
}

const DarkModeContext = createContext<DarkModeContextValue | null>(null)

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dark-mode')
      if (stored === 'true') setIsDark(true)
    } catch {}
  }, [])

  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.setAttribute('data-theme', 'dark')
      html.classList.add('dark')
    } else {
      html.removeAttribute('data-theme')
      html.classList.remove('dark')
    }
    try { localStorage.setItem('dark-mode', String(isDark)) } catch {}
  }, [isDark])

  return (
    <DarkModeContext.Provider value={{ isDark, toggle: () => setIsDark(p => !p) }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  const ctx = useContext(DarkModeContext)
  if (!ctx) throw new Error('useDarkMode must be used inside DarkModeProvider')
  return ctx
}
