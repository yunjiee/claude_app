'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

interface CartItem { id: string; qty: number }

interface CartContextValue {
  items: CartItem[]
  add: (id: string) => void
  remove: (id: string) => void
  update: (id: string, qty: number) => void
  clear: () => void
  count: number
  hasItem: (id: string) => boolean
  qtyOf: (id: string) => number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart_v1')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  const persist = (next: CartItem[]) => {
    setItems(next)
    try { localStorage.setItem('cart_v1', JSON.stringify(next)) } catch {}
  }

  const add = useCallback((id: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === id)
      const next = existing
        ? prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { id, qty: 1 }]
      try { localStorage.setItem('cart_v1', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setItems(prev => {
      const next = prev.filter(i => i.id !== id)
      try { localStorage.setItem('cart_v1', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const update = useCallback((id: string, qty: number) => {
    if (qty <= 0) { remove(id); return }
    setItems(prev => {
      const next = prev.map(i => i.id === id ? { ...i, qty } : i)
      try { localStorage.setItem('cart_v1', JSON.stringify(next)) } catch {}
      return next
    })
  }, [remove])

  const clear = useCallback(() => { persist([]) }, [])

  const count = items.reduce((s, i) => s + i.qty, 0)
  const hasItem = (id: string) => items.some(i => i.id === id)
  const qtyOf = (id: string) => items.find(i => i.id === id)?.qty ?? 0

  return (
    <CartContext.Provider value={{ items, add, remove, update, clear, count, hasItem, qtyOf }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
