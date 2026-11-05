import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { DarkModeProvider } from '@/contexts/DarkModeContext'
import { ToastProvider } from '@/contexts/ToastContext'
import { CartProvider } from '@/contexts/CartContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ToastContainer from '@/components/ui/ToastContainer'
import CommandPalette from '@/components/ui/CommandPalette'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: 'MyApp',
  description: '多主題切換應用',
}

const darkModeScript = `
try {
  if (localStorage.getItem('dark-mode') === 'true') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  }
} catch {}
`

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh-TW" className={`${geist.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <AuthProvider>
          <DarkModeProvider>
            <ToastProvider>
              <ThemeProvider>
                <CartProvider>
                  <Header />
                  <div className="flex-1">{children}</div>
                  <Footer />
                  <ToastContainer />
                  <CommandPalette />
                </CartProvider>
              </ThemeProvider>
            </ToastProvider>
          </DarkModeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
