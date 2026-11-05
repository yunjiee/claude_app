'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'

const mockProducts = [
  { id: '1', name: '高效能鍵盤',   price: 2990, originalPrice: 3990, desc: '靜音軸體，適合長時間辦公使用', emoji: '⌨️', tag: '熱銷' },
  { id: '2', name: '人體工學滑鼠', price: 1490, originalPrice: null, desc: '垂直設計，有效減輕手腕負擔', emoji: '🖱️', tag: '新品' },
  { id: '3', name: '27吋 4K 螢幕', price: 12900, originalPrice: 15900, desc: 'IPS 面板，色彩準確，適合設計工作', emoji: '🖥️', tag: '特價' },
  { id: '4', name: '降噪耳機',     price: 5990, originalPrice: 7990, desc: '主動降噪，續航 30 小時', emoji: '🎧', tag: null },
  { id: '5', name: '筆電支架',     price: 890,  originalPrice: null, desc: '鋁合金材質，六段角度調整', emoji: '💻', tag: null },
  { id: '6', name: '無線充電盤',   price: 690,  originalPrice: 990, desc: '15W 快充，相容所有 Qi 裝置', emoji: '🔋', tag: '特價' },
]

const TAG_STYLES: Record<string, string> = {
  熱銷: 'bg-orange-100 text-orange-700',
  新品: 'bg-blue-100 text-blue-700',
  特價: 'bg-red-100 text-red-700',
}

export default function ShopPage() {
  const [cart, setCart] = useState<string[]>([])

  const addToCart = (id: string) => setCart((prev) => [...prev, id])
  const isInCart = (id: string) => cart.includes(id)

  return (
    <PageLayout title="商城" description={`精選商品 · 購物車 ${cart.length} 件`}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all"
          >
            {/* 商品圖片佔位 */}
            <div className="relative flex h-44 items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors">
              <span className="text-5xl">{product.emoji}</span>
              {product.tag && (
                <span className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${TAG_STYLES[product.tag]}`}>
                  {product.tag}
                </span>
              )}
            </div>

            {/* 資訊 */}
            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-semibold text-gray-900">{product.name}</h2>
              <p className="mt-1 text-sm text-gray-400 leading-relaxed flex-1">{product.desc}</p>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    NT$ {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-2 text-sm text-gray-300 line-through">
                      {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(product.id)}
                  disabled={isInCart(product.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    isInCart(product.id)
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : 'bg-gray-900 text-white hover:bg-gray-700 active:scale-95'
                  }`}
                >
                  {isInCart(product.id) ? '✓ 已加入' : '加入購物車'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
