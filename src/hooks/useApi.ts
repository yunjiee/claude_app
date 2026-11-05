'use client'

// 與 useFetch 的差別：自動帶上 credentials（cookie），
// 並在伺服器回傳 401 時自動跳轉登入頁
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFetch } from './useFetch'

export function useApi<T>(endpoint: string) {
  const router = useRouter()
  const result = useFetch<T>(endpoint, { credentials: 'include' })

  useEffect(() => {
    if (result.error?.includes('401')) {
      router.push(`/login?redirect=${encodeURIComponent(endpoint)}`)
    }
  }, [result.error, endpoint, router])

  return result
}
