const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface RequestOptions {
  method?: HttpMethod
  body?: unknown
  headers?: Record<string, string>
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText)
    throw new Error(message || `HTTP ${res.status}`)
  }

  return res.json() as Promise<T>
}

export const api = {
  get: <T>(endpoint: string, headers?: Record<string, string>) =>
    apiRequest<T>(endpoint, { method: 'GET', headers }),

  post: <T>(endpoint: string, body: unknown) =>
    apiRequest<T>(endpoint, { method: 'POST', body }),

  put: <T>(endpoint: string, body: unknown) =>
    apiRequest<T>(endpoint, { method: 'PUT', body }),

  patch: <T>(endpoint: string, body: unknown) =>
    apiRequest<T>(endpoint, { method: 'PATCH', body }),

  delete: <T>(endpoint: string) =>
    apiRequest<T>(endpoint, { method: 'DELETE' }),
}
