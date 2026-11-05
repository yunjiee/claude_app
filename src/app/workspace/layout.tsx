export const instant = false

import { Suspense, ReactNode } from 'react'
import { WorkspaceProvider } from '@/contexts/WorkspaceContext'
import Sidebar from '@/components/workspace/Sidebar'
import WorkspaceGuard from '@/components/workspace/WorkspaceGuard'

function SidebarFallback() {
  return <aside className="w-56 flex-shrink-0 border-r border-gray-200 bg-gray-50" />
}

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <WorkspaceGuard>
      <WorkspaceProvider>
        <div className="flex h-[calc(100vh-65px)] overflow-hidden">
          <Suspense fallback={<SidebarFallback />}>
            <Sidebar />
          </Suspense>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </WorkspaceProvider>
    </WorkspaceGuard>
  )
}
