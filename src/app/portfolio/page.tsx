import PageLayout from '@/components/layout/PageLayout'

const mockProjects = [
  { id: '1', title: '多主題 Web App',   tech: ['Next.js', 'TypeScript', 'Tailwind'], desc: '支援部落格、作品集、商城、工作區四種主題的一體化平台。', emoji: '🌐' },
  { id: '2', title: 'UI 元件庫',         tech: ['React', 'Storybook', 'CSS Modules'], desc: '可重用的 React 元件庫，包含 30+ 個基礎元件與使用文件。', emoji: '🧩' },
  { id: '3', title: 'API 後端服務',      tech: ['Node.js', 'PostgreSQL', 'REST'], desc: '高效能 RESTful API，支援每秒 1000+ 請求的並發處理。', emoji: '⚙️' },
  { id: '4', title: '行動裝置應用',     tech: ['React Native', 'Expo', 'Firebase'], desc: '跨平台行動應用，iOS 和 Android 同步發布。', emoji: '📱' },
  { id: '5', title: '資料視覺化儀表板', tech: ['D3.js', 'Python', 'Pandas'], desc: '即時資料分析與可視化，整合多個資料來源的統一介面。', emoji: '📊' },
  { id: '6', title: '電商結帳系統',     tech: ['Next.js', 'Stripe', 'Prisma'], desc: '整合金流的完整電商解決方案，支援多種付款方式。', emoji: '💳' },
]

const TECH_COLORS: Record<string, string> = {
  'Next.js': 'bg-black text-white',
  'TypeScript': 'bg-blue-600 text-white',
  'Tailwind': 'bg-cyan-500 text-white',
  'React': 'bg-blue-400 text-white',
  'Node.js': 'bg-green-600 text-white',
  'Firebase': 'bg-yellow-500 text-white',
}

export default function PortfolioPage() {
  return (
    <PageLayout title="作品集" description="個人開發作品展示">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map((project) => (
          <div
            key={project.id}
            className="group flex flex-col rounded-2xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer"
          >
            {/* Icon */}
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-2xl group-hover:scale-110 transition-transform">
              {project.emoji}
            </div>

            <h2 className="text-base font-semibold text-gray-900">{project.title}</h2>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed flex-1">{project.desc}</p>

            {/* Tech badges */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${TECH_COLORS[t] ?? 'bg-gray-100 text-gray-600'}`}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-1 text-xs text-gray-300 group-hover:text-gray-500 transition-colors">
              <span>查看詳情</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
