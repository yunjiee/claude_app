import PageLayout from '@/components/layout/PageLayout'

const mockProducts = [
  { id: '1', name: '商品 A', price: 299, desc: '商品描述...' },
  { id: '2', name: '商品 B', price: 599, desc: '商品描述...' },
  { id: '3', name: '商品 C', price: 999, desc: '商品描述...' },
]

export default function ShopPage() {
  return (
    <PageLayout title="🛒 商城" description="精選商品">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockProducts.map((product) => (
          <div key={product.id} className="rounded-xl border border-gray-200 p-6 hover:border-gray-400 transition-colors">
            <div className="h-32 rounded-lg bg-gray-100" />
            <h2 className="mt-4 font-semibold text-gray-900">{product.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{product.desc}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">NT$ {product.price}</span>
              <button className="rounded-lg bg-gray-900 px-4 py-1.5 text-sm text-white hover:bg-gray-700 transition-colors">
                加入購物車
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
