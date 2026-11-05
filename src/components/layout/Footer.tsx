'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const LINKS = [
  {
    heading: '探索',
    items: [
      { label: '部落格', href: '/blog' },
      { label: '作品集', href: '/portfolio' },
      { label: '商城', href: '/shop' },
      { label: '工作區', href: '/workspace' },
    ],
  },
  {
    heading: '帳戶',
    items: [
      { label: '個人資料', href: '/account' },
      { label: '登入', href: '/login' },
    ],
  },
  {
    heading: '關於',
    items: [
      { label: '關於我們', href: '/' },
      { label: 'GitHub', href: 'https://github.com/yunjiee/claude_app' },
    ],
  },
]

export default function Footer() {
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="text-base font-black text-gray-900 dark:text-gray-100 hover:opacity-80 transition-opacity">
              MyApp
            </Link>
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500 leading-relaxed max-w-[160px]">
              部落格・作品集・商城・工作區，一個應用搞定。
            </p>
          </div>

          {/* Link columns */}
          {LINKS.map(col => (
            <div key={col.heading}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">{col.heading}</p>
              <ul className="space-y-2">
                {col.items.map(item => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                      {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {year ? `© ${year} MyApp. All rights reserved.` : ''}
          </p>
          <p className="text-[10px] text-gray-300 dark:text-gray-600">Built with Next.js · Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  )
}
