import PageLayout from '@/components/layout/PageLayout'

const mockProjects = [
  { id: '1', title: '專案 A', tech: 'React / TypeScript', desc: '專案描述...' },
  { id: '2', title: '專案 B', tech: 'Next.js / Tailwind', desc: '專案描述...' },
  { id: '3', title: '專案 C', tech: 'Node.js / PostgreSQL', desc: '專案描述...' },
]

export default function PortfolioPage() {
  return (
    <PageLayout title="🎨 作品集" description="個人作品展示">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map((project) => (
          <div key={project.id} className="rounded-xl border border-gray-200 p-6 hover:border-gray-400 transition-colors">
            <h2 className="font-semibold text-gray-900">{project.title}</h2>
            <p className="mt-1 text-xs text-indigo-500">{project.tech}</p>
            <p className="mt-3 text-sm text-gray-500">{project.desc}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
