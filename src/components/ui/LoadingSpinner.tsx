export default function LoadingSpinner({ message = '載入中...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  )
}
