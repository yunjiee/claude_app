'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'

const COMMANDS = [
  { id: 'home',      icon: '🏠', label: '首頁',       path: '/',          desc: '回到主頁面' },
  { id: 'blog',      icon: '📝', label: '部落格',     path: '/blog',      desc: '文章列表' },
  { id: 'portfolio', icon: '🎨', label: '作品集',     path: '/portfolio', desc: '個人作品展示' },
  { id: 'shop',      icon: '🛒', label: '商城',       path: '/shop',      desc: '商品瀏覽' },
  { id: 'workspace', icon: '💼', label: '工作區',     path: '/workspace', desc: '行事曆與規劃' },
  { id: 'login',     icon: '🔐', label: '登入 / 帳號', path: '/login',     desc: '登入或管理帳號' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = COMMANDS.filter(c =>
    c.label.includes(query) ||
    c.desc.includes(query) ||
    c.id.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const navigate = (path: string) => {
    router.push(path)
    setOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected(s => (s + 1) % (filtered.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected(s => (s - 1 + (filtered.length || 1)) % (filtered.length || 1))
    } else if (e.key === 'Enter' && filtered[selected]) {
      navigate(filtered[selected].path)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh] bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-md mx-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 px-4 py-3.5">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setSelected(0) }}
                onKeyDown={handleKeyDown}
                placeholder="搜尋頁面..."
                className="flex-1 bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none"
              />
              <kbd className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-[10px] font-mono text-gray-400 dark:text-gray-500">ESC</kbd>
            </div>

            {/* Results */}
            <div className="py-1.5 max-h-72 overflow-y-auto">
              {filtered.length > 0 ? filtered.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onClick={() => navigate(cmd.path)}
                  onMouseEnter={() => setSelected(i)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    i === selected
                      ? 'bg-gray-50 dark:bg-gray-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="text-lg flex-shrink-0">{cmd.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{cmd.label}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">{cmd.desc}</div>
                  </div>
                  {i === selected && (
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              )) : (
                <div className="px-4 py-8 text-center text-sm text-gray-400 dark:text-gray-500">
                  找不到「{query}」的相關頁面
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-2 flex gap-4 text-[10px] text-gray-400 dark:text-gray-500">
              <span><kbd className="font-mono">↑↓</kbd> 移動</span>
              <span><kbd className="font-mono">↵</kbd> 前往</span>
              <span><kbd className="font-mono">Esc</kbd> 關閉</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
