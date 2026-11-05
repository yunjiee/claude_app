import { Theme } from '@/types'

export const themes: Theme[] = [
  {
    id: 'blog',
    name: '部落格',
    description: '文章與知識分享',
    icon: '📝',
    path: '/blog',
  },
  {
    id: 'portfolio',
    name: '作品集',
    description: '個人作品展示',
    icon: '🎨',
    path: '/portfolio',
  },
  {
    id: 'shop',
    name: '商城',
    description: '產品販售頁面',
    icon: '🛒',
    path: '/shop',
  },
  {
    id: 'workspace',
    name: '工作區',
    description: '日曆與頁面管理',
    icon: '🗂',
    path: '/workspace',
  },
]

export const defaultTheme: Theme = themes[0]
