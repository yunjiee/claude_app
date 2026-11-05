import { ReactNode } from 'react'

interface PageLayoutProps {
  title: string
  description?: string
  children: ReactNode
}

export default function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <div className="mb-12 pb-8 border-b border-gray-100">
        <div className="flex items-end gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">{title}</h1>
            {description && (
              <p className="mt-2 text-sm text-gray-400 font-medium">{description}</p>
            )}
          </div>
        </div>
      </div>
      {children}
    </main>
  )
}
