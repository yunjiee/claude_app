'use client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let purify: any = null

async function getPurify() {
  if (!purify) {
    const mod = await import('dompurify')
    purify = mod.default
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return purify as any
}

/** 允許基本排版標籤，移除所有 script / on* 事件 */
export async function sanitizeHtml(dirty: string): Promise<string> {
  if (typeof window === 'undefined') return ''
  const p = await getPurify()
  return String(p.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'br', 'b', 'i', 'em', 'strong', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'blockquote', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    FORCE_BODY: true,
    RETURN_TRUSTED_TYPE: false,
  }))
}

/** 純文字，移除所有 HTML 標籤 */
export async function sanitizeText(dirty: string): Promise<string> {
  if (typeof window === 'undefined') return dirty.replace(/<[^>]*>/g, '')
  const p = await getPurify()
  return String(p.sanitize(dirty, { ALLOWED_TAGS: [], ALLOWED_ATTR: [], RETURN_TRUSTED_TYPE: false }))
}
