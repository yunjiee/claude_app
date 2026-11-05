'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { PRODUCTS, TAG_CFG, DEFAULT_GRADIENT, discount } from '@/lib/shop/products'
import { useCart } from '@/contexts/CartContext'

const CATEGORIES = ['全部', '輸入設備', '顯示器', '音訊設備', '配件', '充電配件']

export default function ShopPage() {
  const { add, hasItem, count, items } = useCart()
  const [category, setCategory] = useState('全部')

  const addToCart = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    add(id)
  }
  const isInCart = (id: string) => hasItem(id)

  const totalPrice = items.reduce((sum, item) => {
    const p = PRODUCTS.find(p => p.id === item.id)
    return sum + (p?.price ?? 0) * item.qty
  }, 0)

  const filtered = category === '全部'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === category)

  return (
    <PageLayout title="商城" description="精選辦公 & 生活好物">

      {/* 購物車橫幅 */}
      {count > 0 && (
        <div className="mb-7 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 px-5 py-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-sm font-bold flex items-center justify-center shadow">
            {count}
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900">購物車</p>
            <p className="text-xs text-gray-400">{count} 件商品 · NT$ {totalPrice.toLocaleString()}</p>
          </div>
          <button className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2 text-sm font-semibold shadow hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95">
            前往結帳 →
          </button>
        </div>
      )}

      {/* 分類篩選 */}
      <div className="mb-7 flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              category === cat
                ? 'bg-gray-900 text-white shadow-sm'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400 self-center">{filtered.length} 件商品</span>
      </div>

      {/* 商品列表 */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => {
          const cfg      = product.tag ? TAG_CFG[product.tag] : null
          const gradient = cfg?.gradient ?? DEFAULT_GRADIENT

          return (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className="group flex flex-col rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 bg-white"
            >
              {/* 商品圖 */}
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

              {/* 商品資訊 */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-gray-400 font-medium">{product.category}</span>
                  <div className="flex items-center gap-0.5">
                    <span className="text-yellow-400 text-[11px]">★</span>
                    <span className="text-[10px] text-gray-500 font-medium">{product.rating}</span>
                    <span className="text-[10px] text-gray-300">({product.reviewCount})</span>
                  </div>
                </div>
                <h2 className="font-bold text-gray-900 text-sm">{product.name}</h2>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed flex-1">{product.shortDesc}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-black text-gray-900">
                      NT$ {product.price.toLocaleString()}
                    </div>
                    {product.originalPrice && (
                      <div className="text-xs text-gray-300 line-through">
                        NT$ {product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => addToCart(product.id, e)}
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
            </Link>
          )
        })}
      </div>

    </PageLayout>
  )
}
