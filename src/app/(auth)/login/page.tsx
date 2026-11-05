import { Suspense } from 'react'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-6">
      <Suspense fallback={<div className="text-sm text-gray-400">載入中...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  )
}
