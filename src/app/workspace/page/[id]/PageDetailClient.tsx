'use client'

import { useParams } from 'next/navigation'
import { useWorkspace } from '@/contexts/WorkspaceContext'
import PageEditor from '@/components/workspace/PageEditor'

export default function PageDetailClient() {
  const { id } = useParams<{ id: string }>()
  const { pages } = useWorkspace()
  const page = pages.find((p) => p.id === id)

  if (!page) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-400">
        找不到頁面
      </div>
    )
  }

  return <PageEditor page={page} />
}
