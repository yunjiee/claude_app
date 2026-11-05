'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product, TAG_CFG, DEFAULT_GRADIENT, discount, getRelated } from '@/lib/shop/products'
import { useCart } from '@/contexts/CartContext'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`text-sm ${i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
      ))}
    </div>
  )
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [qty, setQty]     = useState(1)
  const [tab, setTab]     = useState<'specs' | 'reviews' | 'related'>('specs')
  const [color, setColor] = useState(product.colors?.[0] ?? '')
  const { add, hasItem }  = useCart()

  const cfg      = product.tag ? TAG_CFG[product.tag] : null
  const gradient = cfg?.gradient ?? DEFAULT_GRADIENT
  const related  = getRelated(product.relatedIds)
  const added    = hasItem(product.id)

  const handleAddCart = () => {
    for (let i = 0; i < qty; i++) add(product.id)
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* 麵包屑 */}
      <div className="max-w-5xl mx-auto px-6 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/shop" className="hover:text-gray-700 transition-colors">商城</Link>
          <span>/</span>
          <span className="text-gray-500 font-medium">{product.category}</span>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </nav>
      </div>

      {/* 主內容 */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* 左：商品圖 */}
          <div className="space-y-3">
            <div className={`relative flex items-center justify-center h-80 rounded-3xl bg-gradient-to-br ${gradient} overflow-hidden shadow-xl`}>
              <div className="absolute inset-0 bg-white/5" />
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -left-6 -top-6 w-28 h-28 rounded-full bg-white/10 blur-xl" />
              <span className="text-[6rem] drop-shadow-2xl">{product.emoji}</span>
              {product.tag && cfg && (
                <span className={`absolute top-4 left-4 rounded-full px-4 py-1 text-xs font-bold ${cfg.badge} ${cfg.badgeText} shadow`}>
                  {product.tag}
                </span>
              )}
              {product.originalPrice && (
                <span className="absolute top-4 right-4 rounded-full bg-black/60 text-white text-xs font-bold px-3 py-1">
                  -{discount(product.originalPrice, product.price)}%
                </span>
              )}
            </div>

            {/* 縮圖列（模擬多圖） */}
            <div className="flex gap-2">
              {['正面', '側面', '細節'].map((label, i) => (
                <div
                  key={i}
                  className={`flex-1 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center cursor-pointer border-2 ${i === 0 ? 'border-gray-900' : 'border-transparent opacity-60 hover:opacity-100'} transition-all`}
                >
                  <span className="text-2xl">{product.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 右：商品資訊 */}
          <div className="flex flex-col">
            {/* 分類 & 評分 */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs text-gray-400 font-medium bg-gray-100 rounded-full px-3 py-0.5">{product.category}</span>
              <div className="flex items-center gap-1.5">
                <StarRating rating={product.rating} />
                <span className="text-sm font-bold text-gray-700">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewCount} 則評論)</span>
              </div>
            </div>

            {/* 商品名稱 */}
            <h1 className="text-2xl font-black text-gray-900 mb-3 leading-tight">{product.name}</h1>

            {/* 價格 */}
            <div className="flex items-end gap-3 mb-4">
              <span className="text-3xl font-black text-gray-900">NT$ {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-base text-gray-300 line-through mb-0.5">NT$ {product.originalPrice.toLocaleString()}</span>
              )}
              {product.originalPrice && (
                <span className="text-sm font-bold text-red-500 mb-0.5">省 NT$ {(product.originalPrice - product.price).toLocaleString()}</span>
              )}
            </div>

            {/* 描述 */}
            <p className="text-sm text-gray-500 leading-relaxed mb-5">{product.fullDesc}</p>

            {/* 顏色選擇 */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-700 mb-2">顏色：<span className="font-normal text-gray-500">{color}</span></label>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                        color === c ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 數量 */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-700 mb-2">數量</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-light"
                  >−</button>
                  <span className="w-10 text-center text-sm font-bold text-gray-900">{qty}</span>
                  <button
                    onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-light"
                  >+</button>
                </div>
                <span className="text-xs text-gray-400">庫存 {product.stock} 件</span>
              </div>
            </div>

            {/* 購買按鈕 */}
            <div className="flex gap-3">
              <button
                onClick={handleAddCart}
                className={`flex-1 rounded-2xl py-3 text-sm font-bold transition-all ${
                  added
                    ? 'bg-emerald-500 text-white scale-95'
                    : 'bg-gray-900 text-white hover:bg-gray-700 hover:shadow-lg active:scale-95'
                }`}
              >
                {added ? '✓ 已加入購物車' : '加入購物車'}
              </button>
              <button className="flex-1 rounded-2xl py-3 text-sm font-bold bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg active:scale-95 transition-all">
                立即購買
              </button>
            </div>

            {/* 保障說明 */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { icon: '🚚', text: '免運費' },
                { icon: '↩️', text: '7 天退換貨' },
                { icon: '🛡️', text: '一年保固' },
              ].map(item => (
                <div key={item.text} className="flex flex-col items-center gap-1 rounded-xl bg-gray-50 py-2.5">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-[10px] text-gray-500 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab 區塊 */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        {/* Tab 切換 */}
        <div className="flex border-b border-gray-200 mb-8">
          {([
            { key: 'specs',   label: '商品規格' },
            { key: 'reviews', label: `商品評論（${product.reviews.length}）` },
            { key: 'related', label: '相關商品' },
          ] as const).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                tab === t.key ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 規格 */}
        {tab === 'specs' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={spec.label} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-5 py-3 font-semibold text-gray-700 w-36">{spec.label}</td>
                      <td className="px-5 py-3 text-gray-500">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">產品特色</h3>
              <ul className="space-y-2">
                {product.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 評論 */}
        {tab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex items-center gap-6 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100 p-5 mb-6">
              <div className="text-center">
                <div className="text-4xl font-black text-gray-900">{product.rating}</div>
                <StarRating rating={product.rating} />
                <div className="text-xs text-gray-400 mt-1">{product.reviewCount} 則評論</div>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5,4,3,2,1].map(star => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-3">{star}</span>
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: star === 5 ? '65%' : star === 4 ? '25%' : star === 3 ? '7%' : '2%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {product.reviews.map((review, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
                      {review.name[0]}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{review.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* 相關商品 */}
        {tab === 'related' && (
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map(p => {
              const rcfg = p.tag ? TAG_CFG[p.tag] : null
              const rgrad = rcfg?.gradient ?? DEFAULT_GRADIENT
              return (
                <Link
                  key={p.id}
                  href={`/shop/${p.id}`}
                  className="group flex flex-col rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
                >
                  <div className={`flex items-center justify-center h-32 bg-gradient-to-br ${rgrad}`}>
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{p.emoji}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-0.5">{p.category}</p>
                    <h3 className="text-sm font-bold text-gray-900">{p.name}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-black text-gray-900">NT$ {p.price.toLocaleString()}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-xs text-gray-500">{p.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
