import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 text-7xl">🗺️</div>
      <h1 className="text-5xl font-black text-gray-900 mb-3">404</h1>
      <p className="text-lg font-semibold text-gray-500 mb-2">找不到此頁面</p>
      <p className="text-sm text-gray-400 max-w-sm mb-10 leading-relaxed">
        您要找的頁面不存在，可能已被移除或網址有誤。
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="rounded-2xl bg-gray-900 text-white px-6 py-2.5 text-sm font-bold hover:bg-gray-700 hover:shadow-lg active:scale-95 transition-all"
        >
          返回首頁
        </Link>
        <Link
          href="/blog"
          className="rounded-2xl border border-gray-200 text-gray-600 px-6 py-2.5 text-sm font-bold hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          瀏覽部落格
        </Link>
      </div>
    </main>
  )
}
