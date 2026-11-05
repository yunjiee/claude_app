'use client'

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function WorkspaceGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?redirect=/workspace')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-65px)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-400">驗證身份中…</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return <>{children}</>
}
