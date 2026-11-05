import { NextResponse } from 'next/server'

// 模擬資料庫資料 — 之後替換為真實 DB 查詢
const posts = [
  { id: '1', title: '認識 Next.js App Router', date: '2024-01-01', summary: '介紹 Next.js 13+ 的新路由架構與伺服器元件概念。' },
  { id: '2', title: 'Tailwind CSS 入門', date: '2024-01-15', summary: '用 utility-first 的方式快速打造響應式界面。' },
  { id: '3', title: 'React Context 完整指南', date: '2024-02-01', summary: '從零開始理解 Context API，解決 props drilling 問題。' },
]

export async function GET() {
  // 模擬網路延遲
  await new Promise((r) => setTimeout(r, 500))
  return NextResponse.json(posts)
}
