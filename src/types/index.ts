export type ThemeId = 'blog' | 'portfolio' | 'shop' | 'workspace'

export interface Theme {
  id: ThemeId
  name: string
  description: string
  icon: string
  path: string
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}
