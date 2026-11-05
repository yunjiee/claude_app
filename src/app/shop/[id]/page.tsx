import { PRODUCTS } from '@/lib/shop/products'
import ProductDetailClient from './ProductDetailClient'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return PRODUCTS.map(p => ({ id: p.id }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = PRODUCTS.find(p => p.id === id)
  if (!product) notFound()
  return <ProductDetailClient product={product} />
}
