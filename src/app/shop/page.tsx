'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'

const mockProducts = [
  { id: '1', name: '高效能鍵盤',   price: 2990, originalPrice: 3990, desc: '靜音軸體，適合長時間辦公使用', emoji: '⌨️', tag: '熱銷' },
  { id: '2', name: '人體工學滑鼠', price: 1490, originalPrice: null, desc: '垂直設計，有效減輕手腕負擔',   emoji: '🖱️', tag: '新品' },
  { id: '3', name: '27吋 4K 螢幕', price: 12900, originalPrice: 15900, desc: 'IPS 面板，色彩準確，適合設計工作', emoji: '🖥️', tag: '特價' },
  { id: '4', name: '降噪耳機',     price: 5990, originalPrice: 7990, desc: '主動降噪，續航 30 小時',          emoji: '🎧', tag: null },
  { id: '5', name: '筆電支架',     price: 890,  originalPrice: null, desc: '鋁合金材質，六段角度調整',        emoji: '💻', tag: null },
  { id: '6', name: '無線充電盤',   price: 690,  originalPrice: 990, desc: '15W 快充，相容所有 Qi 裝置',      emoji: '🔋', tag: '特價' },
]

const TAG_CFG: Record<string, { gradient: string; badge: string; badgeText: string }> = {
  熱銷: { gradient: 'from-orange-400 to-amber-400',   badge: 'bg-orange-500',  badgeText: 'text-white' },
  新品: { gradient: 'from-blue-400 to-indigo-500',    badge: 'bg-blue-500',    badgeText: 'text-white' },
  特價: { gradient: 'from-red-400 to-rose-500',       badge: 'bg-red-500',     badgeText: 'text-white' },
}
const DEFAULT_GRADIENT = 'from-gray-200 to-gray-300'

const discount = (orig: number, cur: number) => Math.round((1 - cur / orig) * 100)

export default function ShopPage() {
  const [cart, setCart] = useState<string[]>([])

  const addToCart = (id: string) => setCart(prev => [...prev, id])
  const isInCart  = (id: string) => cart.includes(id)

  const totalPrice = cart.reduce((sum, id) => {
    const p = mockProducts.find(p => p.id === id)
    return sum + (p?.price ?? 0)
  }, 0)

  return (
    <PageLayout title="商城" description="精選辦公 & 生活好物">

      {/* ── Cart banner ── */}
      {cart.length > 0 && (
        <div className="mb-7 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 px-5 py-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-sm font-bold flex items-center justify-center shadow">
              {cart.length}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900">購物車</p>
            <p className="text-xs text-gray-400">{cart.length} 件商品 · NT$ {totalPrice.toLocaleString()}</p>
          </div>
          <button className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2 text-sm font-semibold shadow hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95">
            前往結帳 →
          </button>
        </div>
      )}

      {/* ── Product grid ── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mockProducts.map((product) => {
          const cfg = product.tag ? TAG_CFG[product.tag] : null
          const gradient = cfg?.gradient ?? DEFAULT_GRADIENT

          return (
            <div
              key={product.id}
              className="group flex flex-col rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Gradient emoji area */}
              <div className={`relative flex items-center justify-center h-44 bg-gradient-to-br ${gradient} overflow-hidden`}>
                <div className="absolute inset-0 bg-white/5" />
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl" />
                <span className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {product.emoji}
                </span>
                {product.tag && cfg && (
                  <span className={`absolute top-3 left-3 rounded-full px-3 py-0.5 text-[11px] font-bold ${cfg.badge} ${cfg.badgeText} shadow-sm`}>
                    {product.tag}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="absolute top-3 right-3 rounded-full bg-black/60 text-white text-[10px] font-bold px-2 py-0.5">
                    -{discount(product.originalPrice, product.price)}%
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col p-5 bg-white">
                <h2 className="font-bold text-gray-900 text-sm">{product.name}</h2>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed flex-1">{product.desc}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-gray-900">
                      NT$ {product.price.toLocaleString()}
                    </div>
                    {product.originalPrice && (
                      <div className="text-xs text-gray-300 line-through">
                        {product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={isInCart(product.id)}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      isInCart(product.id)
                        ? 'bg-emerald-50 text-emerald-600 cursor-default border border-emerald-200'
                        : 'bg-gray-900 text-white hover:bg-gray-700 hover:shadow-md active:scale-95'
                    }`}
                  >
                    {isInCart(product.id) ? '✓ 已加入' : '加入購物車'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </PageLayout>
  )
}
