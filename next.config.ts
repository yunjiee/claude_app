import type { NextConfig } from "next";

const securityHeaders = [
  // 防止點擊劫持 (Clickjacking)
  { key: 'X-Frame-Options', value: 'DENY' },
  // 防止 MIME 類型嗅探
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Referrer 策略：只在同源或同協議時傳送
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // 限制瀏覽器功能
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  // HSTS：強制 HTTPS（僅生產環境有效）
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // XSS 防護 header（舊版瀏覽器）
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js 需要 unsafe-inline / unsafe-eval 做 hydration
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig;
