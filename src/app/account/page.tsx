'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { PRODUCTS } from '@/lib/shop/products'

const STAT_ITEMS = [
  { label: '購物車商品', icon: '🛒' },
  { label: '已發布文章', icon: '📝', value: '3' },
  { label: '作品集專案', icon: '💼', value: '6' },
]

export default function AccountPage() {
  const { user } = useAuth()
  const { items, count } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.replace('/login')
  }, [user, router])

  if (!user) return null

  const cartTotal = items.reduce((sum, item) => {
    const p = PRODUCTS.find(p => p.id === item.id)
    return sum + (p?.price ?? 0) * item.qty
  }, 0)

  const initials = user.name.slice(0, 2).toUpperCase()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Profile hero */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 py-12">
        <div className="max-w-2xl mx-auto px-6 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl font-black shadow-xl ring-4 ring-white/30">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-black text-white mb-1">{user.name}</h1>
            <p className="text-white/70 text-sm">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {STAT_ITEMS.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xl font-black text-gray-900">
                {s.label === '購物車商品' ? count : s.value}
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Cart summary */}
        {items.length > 0 && (
          <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-black text-gray-900 mb-4">購物車</h2>
            <div className="space-y-3">
              {items.map(item => {
                const p = PRODUCTS.find(p => p.id === item.id)
                if (!p) return null
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="text-2xl">{p.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                      <p className="text-xs text-gray-400">x{item.qty}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      NT$ {(p.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                )
              })}
              <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">小計</span>
                <span className="text-base font-black text-gray-900">NT$ {cartTotal.toLocaleString()}</span>
              </div>
            </div>
            <Link
              href="/shop"
              className="mt-4 block w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center py-3 text-sm font-bold hover:opacity-90 hover:shadow-md active:scale-95 transition-all"
            >
              前往結帳 →
            </Link>
          </section>
        )}

        {/* Quick links */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-black text-gray-900 mb-4">快速連結</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: '/blog', label: '部落格', emoji: '📰' },
              { href: '/portfolio', label: '作品集', emoji: '💼' },
              { href: '/shop', label: '商城', emoji: '🛒' },
              { href: '/workspace', label: '工作區', emoji: '🗂️' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl border border-gray-100 p-4 hover:bg-gray-50 hover:shadow-sm transition-all"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm font-semibold text-gray-700">{item.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
