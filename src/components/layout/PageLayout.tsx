import { ReactNode } from 'react'

interface PageLayoutProps {
  title: string
  description?: string
  children: ReactNode
}

export default function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
        {description && <p className="mt-2 text-gray-500">{description}</p>}
      </div>
      {children}
    </main>
  )
}
