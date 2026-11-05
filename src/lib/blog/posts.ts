export type PostCategory = '技術' | '設計' | '生活'

export interface BlogPost {
  id: string
  title: string
  date: string
  summary: string
  category: PostCategory
  author: string
  readTime: number
  coverGradient: string
  coverAccent: string
  content: string   // 段落以 \n\n 分隔，## 開頭為小標題
}

export const POSTS: BlogPost[] = [
  {
    id: '1',
    title: '認識 Next.js App Router',
    date: '2024-11-01',
    summary: '介紹 Next.js 13+ 的新路由架構與伺服器元件概念，以及如何從 Pages Router 平滑遷移。',
    category: '技術',
    author: 'Justin Lin',
    readTime: 6,
    coverGradient: 'from-violet-500 to-indigo-600',
    coverAccent: 'text-violet-600',
    content: `## 什麼是 App Router？

Next.js 13 引入了全新的 App Router，將路由邏輯移到 app/ 目錄下，取代原有的 pages/ 目錄。這不只是資料夾名稱的改變，而是底層架構的重大轉變。

App Router 的核心概念是**伺服器元件（Server Components）**。預設情況下，app/ 目錄下的所有元件都是伺服器元件，它們在伺服器端執行，不會佔用客戶端的 JavaScript bundle 大小。

## 目錄結構變化

在 App Router 中，每個資料夾代表一個路由段落（segment）。若想讓路由生效，資料夾內必須有 page.tsx。除了 page，還有 layout、loading、error、not-found 等特殊檔案，各自有不同用途。

layout.tsx 是最常用的，它包裹子路由並在導航時保留狀態，不會重新渲染。這讓共用 Sidebar 或 Header 變得非常容易。

## 伺服器元件 vs 客戶端元件

預設的伺服器元件無法使用 useState、useEffect 等 React hooks，也無法綁定瀏覽器事件。若需要互動性，必須在檔案最頂端加上 'use client'，將元件標記為客戶端元件。

最佳實踐是**盡量把元件保留為伺服器元件**，只在必要時才切換到客戶端。例如一個資料展示頁面，可以是伺服器元件，只把互動的按鈕或表單抽出成獨立的客戶端元件。

## params 在 Next.js 16 是 Promise

一個重要的 breaking change：Next.js 16 中，動態路由的 params 和 searchParams 都變成了 Promise，必須 await。

\`\`\`tsx
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // ...
}
\`\`\`

## 遷移建議

如果你正在從 Pages Router 遷移，建議逐步進行：先保留 pages/ 目錄，同時把新頁面寫在 app/ 下。兩者可以共存，Next.js 會優先使用 app/ 中的路由。`,
  },
  {
    id: '2',
    title: 'Tailwind CSS 實戰技巧',
    date: '2024-10-18',
    summary: '從 utility-first 哲學出發，分享 Tailwind 在實際專案中的進階技巧與效能最佳化方式。',
    category: '設計',
    author: 'Justin Lin',
    readTime: 5,
    coverGradient: 'from-cyan-400 to-blue-500',
    coverAccent: 'text-cyan-600',
    content: `## Utility-First 的核心思維

Tailwind CSS 的 utility-first 哲學一開始讓很多開發者感到不舒服——HTML 裡塞滿了 class，看起來很「髒」。但實際使用後，你會發現它極大地提升了開發速度，並且讓樣式更容易預測。

關鍵在於：**不是不寫 CSS，而是在 HTML 裡直接描述樣式意圖**。每個 class 都是一個樣式聲明，讀到 class 就知道樣式，不需要在 HTML 和 CSS 檔案之間跳轉。

## 善用 @apply 整合重複樣式

當同一組 class 大量重複出現時，可以用 @apply 整合成一個語意化的 class。

\`\`\`css
.btn-primary {
  @apply rounded-xl bg-gray-900 text-white px-4 py-2 font-semibold hover:bg-gray-700 transition-colors;
}
\`\`\`

但要注意：過度使用 @apply 會讓你退回到傳統 CSS 的思維，失去 utility-first 的好處。建議只在三個以上的元件共用相同樣式時才抽取。

## 動態 class 的陷阱

Tailwind 在 build 時掃描所有檔案，只打包實際用到的 class。因此**不能**用字串拼接的方式動態生成 class 名稱：

\`\`\`tsx
// 錯誤：bg-blue-500 不會被打包
const color = 'blue'
// className={'bg-' + color + '-500'}

// 正確：完整 class 名稱都能被掃到
const className = isActive ? 'bg-blue-500' : 'bg-gray-100'
// className={className}
\`\`\`

## 深色模式與 CSS 變數的結合

Tailwind 的 dark: 修飾子非常方便，但在複雜主題切換場景下，配合 CSS 自訂屬性（變數）更彈性。在 tailwind.config 中設定 extend.colors 指向 CSS 變數，可以讓主題切換只需修改 :root 的變數值。

## 效能：只用 Purge 刪除沒用到的 class

Tailwind v3 以後預設啟用 JIT（Just-in-Time）模式，不需要手動配置 purge，開發和生產都只生成實際使用的 CSS。最終打包後的 CSS 通常只有 10-30KB，比傳統框架小得多。`,
  },
  {
    id: '3',
    title: 'React Context 完整指南',
    date: '2024-09-25',
    summary: '從零開始理解 Context API，解決 props drilling 問題，並探討什麼時候該用 Context、什麼時候該選 Zustand 等狀態管理工具。',
    category: '技術',
    author: 'Justin Lin',
    readTime: 8,
    coverGradient: 'from-emerald-400 to-teal-500',
    coverAccent: 'text-emerald-600',
    content: `## 什麼是 Props Drilling 問題？

當一個資料需要從最上層元件傳遞到深層子元件時，中間所有層級都必須接收並轉傳這個 prop，即使中間層根本不需要使用它。這就是所謂的 props drilling（屬性鑽孔）。

例如使用者的登入狀態，可能需要在 Header、UserMenu、ProfileAvatar、SettingsForm 等多個元件中使用，如果用 props 傳遞會非常繁瑣。

## 建立 Context 的標準方式

建立 Context 分三個步驟：

1. 用 createContext 創建 context 物件
2. 建立 Provider 元件，包裝需要存取該 context 的元件樹
3. 在子元件中用 useContext 取得值

\`\`\`tsx
const ThemeContext = createContext<ThemeValue | null>(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
\`\`\`

## Context 的效能問題

Context 有一個重要的效能陷阱：**Provider 的 value 物件每次 render 都會重新建立**，導致所有使用這個 Context 的子元件都重新渲染。

解決方法是用 useMemo 和 useCallback 穩定化 value 中的物件和函數，或者把頻繁更新的狀態從 Context 中分離出去。

## 什麼時候不應該用 Context？

Context 適合用於**低頻更新**、**全域共享**的資料，像是主題、語言設定、認證狀態。

如果你需要管理：
- 高頻更新的狀態（例如動畫、滾動位置）
- 複雜的衍生狀態計算
- 跨元件的非同步操作
- 大型應用的業務邏輯

這些情況應該考慮使用 Zustand、Jotai 或 TanStack Query。

## 組合多個 Context

大型應用通常有多個 Context（Auth、Theme、Cart 等）。可以建立一個 AppProviders 元件把所有 Provider 組合在一起，避免 root layout 的 JSX 嵌套地獄。`,
  },
  {
    id: '4',
    title: '打造有設計感的深色主題',
    date: '2024-09-10',
    summary: '不只是把顏色反轉，真正好的深色主題有自己的設計語言。本文分享實作深色模式的完整思路與技術細節。',
    category: '設計',
    author: 'Justin Lin',
    readTime: 7,
    coverGradient: 'from-gray-700 to-gray-900',
    coverAccent: 'text-gray-600',
    content: `## 深色主題不是把顏色翻轉

很多人第一次實作深色主題，會直接把白色背景換成黑色，把深色文字換成白色。這樣確實能「運作」，但看起來往往很刺眼。

真正好的深色主題有幾個關鍵原則：
- **不要用純黑**，使用略帶藍調或暖調的深灰（#0f1117 或 #1a1a2e）
- **降低對比度**，深色環境下高對比反而讓眼睛疲勞，文字亮度約 80% 即可
- **陰影不能用黑色加透明度**，深色背景上的卡片陰影幾乎看不見，改用微微發光效果

## 使用 CSS 變數定義 Token

用 CSS 自訂屬性建立 design token，讓主題切換只需修改一個地方：

\`\`\`css
:root {
  --bg: #ffffff;
  --bg-card: #f9fafb;
  --fg: #111827;
  --fg-muted: #6b7280;
  --border: #e5e7eb;
}

:root[data-theme="dark"] {
  --bg: #0f1117;
  --bg-card: #1c1f26;
  --fg: #e5e7eb;
  --fg-muted: #9ca3af;
  --border: #2d3340;
  color-scheme: dark;
}
\`\`\`

## 偵測系統偏好

透過 prefers-color-scheme media query 自動跟隨系統設定，同時保留手動切換的能力：

\`\`\`css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* 深色 token 值 */
  }
}
\`\`\`

這個 :not([data-theme="light"]) 的技巧讓手動選擇「淺色」可以覆蓋系統偏好，非常關鍵。

## 漸層在深色主題中的應用

深色主題中，細微的漸層比純色更有層次感。卡片背景可以使用非常微弱的漸層，例如 from-[#1c1f26] to-[#1a1d23]，幾乎看不出來但就是比純色好看。`,
  },
  {
    id: '5',
    title: '一個人的遠端工作日記',
    date: '2024-08-20',
    summary: '轉換成遠端工作三個月後的真實心得，包括時間管理、自律策略，以及如何維持社交連結。',
    category: '生活',
    author: 'Justin Lin',
    readTime: 4,
    coverGradient: 'from-orange-400 to-amber-500',
    coverAccent: 'text-orange-600',
    content: `## 第一個月：自由的陷阱

剛開始遠端工作，最大的挑戰不是工作本身，而是**時間的流動感消失了**。

在辦公室，上班打卡、午休一小時、下班打卡，時間有清楚的框架。遠端工作後，早上可以拖到十點才開電腦，下午三點還在開會，晚上又突然有靈感繼續工作到午夜。這種不規律性讓生產力極不穩定。

我花了整整一個月才意識到，遠端工作不是給你更多自由，而是**要求你自己建立結構**。

## 建立「通勤儀式」

物理通勤雖然惱人，但它有一個隱藏功效：它是工作模式的開關。

我的解法是建立虛擬通勤：每天早上九點出門走路 20 分鐘，回來後沖澡、換上正式（但舒適）的衣服，然後才開電腦。這個儀式讓大腦知道「工作時間到了」。

## 專注時間的保護

我用番茄工作法（Pomodoro）管理時間：25 分鐘專注、5 分鐘休息。但比時間管理技術更重要的是**環境設計**。

手機放到另一個房間。關掉所有通知。用 Raycast 的 Do Not Disturb 模式屏蔽所有干擾。工作的時候就只有工作視窗。

## 社交的刻意維護

遠端工作最容易被忽視的是社交需求。在辦公室，你會不經意地和同事閒聊，這些碎片化的社交對心理健康很重要。

我的策略是：每週固定一天到咖啡廳工作，每個月至少和兩個朋友面對面吃飯。這些不是隨緣發生的，要**排進行事曆**，不然就會一直被工作佔滿。`,
  },
  {
    id: '6',
    title: '用 TypeScript 寫出更安全的程式碼',
    date: '2024-08-05',
    summary: 'TypeScript 不只是加型別，它改變了你思考程式設計的方式。本文探討如何善用型別系統讓 bug 在編譯期就被抓出來。',
    category: '技術',
    author: 'Justin Lin',
    readTime: 6,
    coverGradient: 'from-blue-500 to-indigo-600',
    coverAccent: 'text-blue-600',
    content: `## 型別是文件，也是保險

很多人覺得加型別是額外的工作量。但換個角度看：**型別是最準確、永遠不會過期的文件**。一個函數的型別簽名就告訴你它接受什麼、回傳什麼，不需要去讀實作細節。

更重要的是，型別讓編輯器和 TypeScript compiler 能在你送出程式碼前就找到問題。

## 嚴格模式的威力

TypeScript 的 strict 設定包含多個子選項，最重要的是 strictNullChecks。開啟後，null 和 undefined 就不能悄悄藏在任何型別裡，你必須明確處理它們。

\`\`\`typescript
// 沒有 strictNullChecks：這樣可以，但執行時可能爆
const user = getUser()
console.log(user.name)   // 如果 getUser() 回傳 null 就壞了

// 有 strictNullChecks：compiler 強制你處理 null
const user = getUser()   // 型別是 User | null
if (user) {
  console.log(user.name)  // 這裡 TypeScript 知道 user 一定是 User
}
\`\`\`

## 善用 Discriminated Union

用字面量型別建立有區分性的 Union，讓狀態機更安全：

\`\`\`typescript
type ApiState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

function render(state: ApiState<User>) {
  if (state.status === 'success') {
    return state.data.name   // TypeScript 知道這裡有 data
  }
}
\`\`\`

## unknown 比 any 安全

當你真的不知道某個值的型別時，用 unknown 而不是 any。unknown 不能直接使用，必須先做型別縮窄（type narrowing），這讓你被迫處理不確定性，而不是假裝它不存在。

## Zod：執行期的型別驗證

TypeScript 的型別檢查只在編譯期有效，執行期從外部（API、使用者輸入）進來的資料完全不受保護。Zod 讓你定義 schema，在執行期驗證並解析外部資料，確保資料符合你期待的結構。`,
  },
]

export const CAT_CFG: Record<PostCategory, { active: string; dot: string; badge: string }> = {
  '技術': { active: 'bg-blue-500 text-white',    dot: 'bg-blue-400',    badge: 'bg-blue-100 text-blue-700' },
  '設計': { active: 'bg-pink-500 text-white',    dot: 'bg-pink-400',    badge: 'bg-pink-100 text-pink-700' },
  '生活': { active: 'bg-emerald-500 text-white', dot: 'bg-emerald-400', badge: 'bg-emerald-100 text-emerald-700' },
}

export function getPost(id: string): BlogPost | undefined {
  return POSTS.find(p => p.id === id)
}
