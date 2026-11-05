export interface PortfolioProject {
  id: string
  title: string
  tech: string[]
  shortDesc: string
  fullDesc: string
  emoji: string
  gradient: string
  light: string
  border: string
  accent: string
  status: '已完成' | '進行中'
  year: string
  highlights: string[]
  challenges: string
  githubUrl: string
  liveUrl: string
  screens: { emoji: string; label: string }[]
}

const TECH_COLORS: Record<string, string> = {
  'Next.js': 'bg-black text-white',
  'TypeScript': 'bg-blue-600 text-white',
  'Tailwind': 'bg-cyan-500 text-white',
  'React': 'bg-blue-400 text-white',
  'React Native': 'bg-blue-300 text-blue-900',
  'Storybook': 'bg-pink-500 text-white',
  'CSS Modules': 'bg-blue-700 text-white',
  'Node.js': 'bg-green-600 text-white',
  'PostgreSQL': 'bg-indigo-600 text-white',
  'REST': 'bg-gray-600 text-white',
  'Expo': 'bg-black text-white',
  'Firebase': 'bg-yellow-500 text-black',
  'D3.js': 'bg-orange-500 text-white',
  'Python': 'bg-blue-700 text-white',
  'Pandas': 'bg-purple-600 text-white',
  'Stripe': 'bg-indigo-600 text-white',
  'Prisma': 'bg-slate-800 text-white',
  'Three.js': 'bg-gray-900 text-white',
  'Framer Motion': 'bg-purple-500 text-white',
}

export { TECH_COLORS }

export const PROJECTS: PortfolioProject[] = [
  {
    id: '1',
    title: '多主題 Web App',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Three.js', 'Framer Motion'],
    shortDesc: '支援部落格、作品集、商城、工作區四種主題的一體化平台',
    fullDesc: '這個專案是一個整合多種功能的 Web 平台，讓使用者可以在同一個應用中切換不同的「模式」。技術上採用 Next.js App Router 架構，透過 Context API 管理全域主題狀態，並結合 Three.js 和 Framer Motion 打造視覺豐富的使用者介面。',
    emoji: '🌐',
    gradient: 'from-violet-500 to-purple-600',
    light: 'from-violet-50 to-purple-50',
    border: 'border-violet-100',
    accent: 'text-violet-600',
    status: '進行中',
    year: '2024',
    highlights: [
      '四種功能主題：部落格、作品集、商城、工作區，可即時切換',
      '工作區整合日曆（新增/編輯行程）和頁面編輯器',
      'Three.js 3D 動態背景與 Framer Motion 卷動動畫',
      'JWT HMAC 簽名認證系統，附 CSP 安全標頭',
      'Aceternity UI CardSpotlight 滑鼠跟蹤特效',
    ],
    challenges: '最大挑戰是在不同主題之間保持一致的設計語言，同時又讓每個主題有獨特的視覺識別。解法是建立統一的 Design Token 系統，讓主題切換只需改變 CSS 變數。',
    githubUrl: 'https://github.com/yunjiee/claude_app',
    liveUrl: 'https://claude-app-omega.vercel.app',
    screens: [
      { emoji: '🏠', label: '首頁' },
      { emoji: '📅', label: '日曆' },
      { emoji: '🛒', label: '商城' },
    ],
  },
  {
    id: '2',
    title: 'UI 元件庫',
    tech: ['React', 'TypeScript', 'Storybook', 'CSS Modules'],
    shortDesc: '可重用的 React 元件庫，包含 30+ 個基礎元件與使用文件',
    fullDesc: '從零打造的內部 UI 元件庫，包含 Button、Input、Modal、Table、Toast 等 30 多個基礎元件。每個元件都有完整的 TypeScript 型別定義，並用 Storybook 撰寫互動式文件，讓設計師和開發者都能快速理解使用方式。',
    emoji: '🧩',
    gradient: 'from-blue-400 to-indigo-500',
    light: 'from-blue-50 to-indigo-50',
    border: 'border-blue-100',
    accent: 'text-blue-600',
    status: '已完成',
    year: '2023',
    highlights: [
      '30+ 個基礎 UI 元件，完整 TypeScript 型別',
      'Storybook 互動式文件，支援 Controls 插件',
      '支援淺色 / 深色主題，以 CSS 變數實作',
      '單元測試覆蓋率 85%，使用 Vitest + Testing Library',
      'Tree-shaking 友善，按需引入不影響打包大小',
    ],
    challenges: '最困難的是設計 API 一致性——讓所有元件的 props 命名規範保持統一，同時又要足夠彈性以應付各種使用情境。最終採用 Compound Component 模式解決了大部分複雜元件的 API 設計問題。',
    githubUrl: '#',
    liveUrl: '#',
    screens: [
      { emoji: '🔘', label: '按鈕' },
      { emoji: '📝', label: '表單' },
      { emoji: '📊', label: '表格' },
    ],
  },
  {
    id: '3',
    title: 'API 後端服務',
    tech: ['Node.js', 'PostgreSQL', 'REST'],
    shortDesc: '高效能 RESTful API，支援每秒 1000+ 請求的並發處理',
    fullDesc: '為中型 SaaS 產品設計的後端 API 服務。採用 Node.js + Express 架構，資料庫使用 PostgreSQL 配合 Prisma ORM。實作了完整的認證機制（JWT + Refresh Token）、請求速率限制、以及基於角色的存取控制（RBAC）。',
    emoji: '⚙️',
    gradient: 'from-emerald-400 to-teal-500',
    light: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-100',
    accent: 'text-emerald-600',
    status: '已完成',
    year: '2023',
    highlights: [
      '100+ 個 REST API 端點，完整 Swagger 文件',
      'JWT + Refresh Token 雙令牌認證機制',
      '基於角色的存取控制（RBAC），支援細粒度權限設定',
      'Redis 快取層，高頻查詢回應時間 < 10ms',
      '壓力測試可支援 1200 req/s 並發，P99 延遲 < 200ms',
    ],
    challenges: '最大的技術挑戰是在高並發下保持資料一致性。採用資料庫交易（Transaction）和樂觀鎖（Optimistic Locking）解決了大部分競爭條件問題，同時用 Redis 做分散式鎖確保關鍵操作的原子性。',
    githubUrl: '#',
    liveUrl: '#',
    screens: [
      { emoji: '📡', label: 'API' },
      { emoji: '🔐', label: '認證' },
      { emoji: '📈', label: '監控' },
    ],
  },
  {
    id: '4',
    title: '行動裝置應用',
    tech: ['React Native', 'Expo', 'Firebase'],
    shortDesc: '跨平台行動應用，iOS 和 Android 同步發布',
    fullDesc: '使用 React Native 和 Expo 開發的健身追蹤 App，支援 iOS 和 Android 雙平台。整合 Firebase 做即時資料同步，讓使用者的訓練紀錄在多裝置間自動同步。結合裝置的運動感測器，自動偵測步數和運動類型。',
    emoji: '📱',
    gradient: 'from-orange-400 to-amber-500',
    light: 'from-orange-50 to-amber-50',
    border: 'border-orange-100',
    accent: 'text-orange-600',
    status: '已完成',
    year: '2023',
    highlights: [
      'iOS + Android 同一份程式碼，Expo EAS 自動化建置',
      'Firebase Realtime Database 多裝置即時同步',
      '整合 Accelerometer，自動辨識 8 種運動類型',
      '離線優先設計，無網路時照常記錄，聯網後自動同步',
      'App Store 評分 4.7 星，1000+ 次下載',
    ],
    challenges: '最難的部分是離線優先的資料同步架構。需要在本地端用 SQLite 儲存資料，聯網後與 Firebase 做雙向同步，並解決衝突問題。最終採用 Last-Write-Wins 策略配合時間戳記，在大多數場景下運作良好。',
    githubUrl: '#',
    liveUrl: '#',
    screens: [
      { emoji: '🏋️', label: '訓練' },
      { emoji: '📊', label: '數據' },
      { emoji: '👤', label: '個人' },
    ],
  },
  {
    id: '5',
    title: '資料視覺化儀表板',
    tech: ['D3.js', 'React', 'Python', 'Pandas'],
    shortDesc: '即時資料分析與可視化，整合多個資料來源的統一介面',
    fullDesc: '為電商公司打造的即時資料儀表板，整合訂單系統、廣告平台、和用戶行為資料，讓業務團隊可以在同一個介面監控所有關鍵指標。前端用 D3.js 繪製客製化圖表，後端用 Python + Pandas 做資料處理和聚合。',
    emoji: '📊',
    gradient: 'from-pink-400 to-rose-500',
    light: 'from-pink-50 to-rose-50',
    border: 'border-pink-100',
    accent: 'text-pink-600',
    status: '已完成',
    year: '2024',
    highlights: [
      '整合 10+ 個資料來源，統一在一個介面呈現',
      '20+ 種互動式圖表，支援縮放、篩選、鑽取',
      '即時數據更新，延遲 < 2 秒',
      'Python ETL 管線每小時自動處理並聚合資料',
      '客製化報表功能，支援 PDF / Excel 匯出',
    ],
    challenges: '最大的挑戰是效能優化。原始資料每天產生數百萬筆，直接查詢太慢。解法是設計多層聚合策略：即時層（最近 1 小時原始資料）、小時層（預聚合的每小時摘要）、天層（每日彙總），讓不同時間範圍的查詢都能在 1 秒內回應。',
    githubUrl: '#',
    liveUrl: '#',
    screens: [
      { emoji: '📉', label: '趨勢' },
      { emoji: '🗺️', label: '地圖' },
      { emoji: '📋', label: '報表' },
    ],
  },
  {
    id: '6',
    title: '電商結帳系統',
    tech: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
    shortDesc: '整合金流的完整電商解決方案，支援多種付款方式',
    fullDesc: '為中型電商平台開發的結帳系統，整合 Stripe 金流支援信用卡、Apple Pay、Google Pay 等多種付款方式。實作了購物車、折扣碼、運費計算、發票開立等完整的結帳流程，並有完整的訂單管理後台。',
    emoji: '💳',
    gradient: 'from-cyan-400 to-blue-500',
    light: 'from-cyan-50 to-blue-50',
    border: 'border-cyan-100',
    accent: 'text-cyan-600',
    status: '已完成',
    year: '2024',
    highlights: [
      '整合 Stripe Checkout，支援 10+ 種付款方式',
      '完整結帳流程：購物車 → 運費 → 折扣 → 付款 → 發票',
      'Webhook 處理付款確認，100% 訂單狀態同步',
      '後台訂單管理系統，支援退款、換貨操作',
      '符合 PCI DSS 規範，所有卡號資料由 Stripe 保管',
    ],
    challenges: '金流整合最怕的是邊緣情況：付款成功但 webhook 沒收到怎麼辦？使用者付款後關閉視窗怎麼辦？解法是設計冪等（idempotent）的訂單狀態機，所有狀態轉換都有明確的前置條件，並用定時任務對帳確保沒有漏單。',
    githubUrl: '#',
    liveUrl: '#',
    screens: [
      { emoji: '🛒', label: '購物車' },
      { emoji: '💳', label: '付款' },
      { emoji: '📦', label: '訂單' },
    ],
  },
]

export function getProject(id: string): PortfolioProject | undefined {
  return PROJECTS.find(p => p.id === id)
}
