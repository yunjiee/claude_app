'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Theme, ThemeId } from '@/types'
import { themes, defaultTheme } from '@/lib/themes/config'

interface ThemeContextValue {
  currentTheme: Theme
  switchTheme: (id: ThemeId) => void
  themes: Theme[]
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme)

  const switchTheme = (id: ThemeId) => {
    const next = themes.find((t) => t.id === id)
    if (next) setCurrentTheme(next)
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
