export const instant = false

import { Suspense } from 'react'
import PageDetailClient from './PageDetailClient'

export default function WorkspacePageDetail() {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-gray-400">載入中...</div>}>
      <PageDetailClient />
    </Suspense>
  )
}
