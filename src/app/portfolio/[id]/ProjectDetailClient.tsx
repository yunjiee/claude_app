'use client'

import Link from 'next/link'
import { PortfolioProject, TECH_COLORS } from '@/lib/portfolio/projects'

export default function ProjectDetailClient({ project }: { project: PortfolioProject }) {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className={`bg-gradient-to-br ${project.gradient} py-16`}>
        <div className="max-w-3xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-white/70 mb-6">
            <Link href="/portfolio" className="hover:text-white transition-colors">作品集</Link>
            <span>/</span>
            <span className="text-white font-medium">{project.title}</span>
          </nav>

          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl shadow-lg">
              {project.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold bg-white/20 text-white`}>
                  {project.status}
                </span>
                <span className="text-white/60 text-xs">{project.year}</span>
              </div>
              <h1 className="text-3xl font-black text-white leading-tight mb-3">{project.title}</h1>
              <p className="text-white/80 text-sm leading-relaxed">{project.shortDesc}</p>
            </div>
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tech.map(t => (
              <span key={t} className={`rounded-full px-3 py-1 text-xs font-semibold shadow ${TECH_COLORS[t] ?? 'bg-white/20 text-white'}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">

        {/* Full description */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-base font-black text-gray-900 mb-4">專案介紹</h2>
          <p className="text-sm text-gray-600 leading-8">{project.fullDesc}</p>
        </section>

        {/* Highlights */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-base font-black text-gray-900 mb-5">亮點功能</h2>
          <ul className="space-y-3">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white text-[10px] font-black`}>
                  {i + 1}
                </span>
                {h}
              </li>
            ))}
          </ul>
        </section>

        {/* Screens */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-base font-black text-gray-900 mb-5">功能預覽</h2>
          <div className="grid grid-cols-3 gap-4">
            {project.screens.map(s => (
              <div
                key={s.label}
                className={`aspect-square rounded-2xl bg-gradient-to-br ${project.gradient} flex flex-col items-center justify-center gap-2 opacity-90 hover:opacity-100 hover:scale-105 transition-all`}
              >
                <span className="text-3xl">{s.emoji}</span>
                <span className="text-xs font-bold text-white">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-base font-black text-gray-900 mb-4">技術挑戰</h2>
          <p className="text-sm text-gray-600 leading-8">{project.challenges}</p>
        </section>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 text-white px-6 py-3 text-sm font-bold hover:bg-gray-700 hover:shadow-lg active:scale-95 transition-all"
            >
              <span>GitHub</span>
              <span>↗</span>
            </a>
          )}
          {project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r ${project.gradient} text-white px-6 py-3 text-sm font-bold hover:opacity-90 hover:shadow-lg active:scale-95 transition-all`}
            >
              <span>線上預覽</span>
              <span>↗</span>
            </a>
          )}
        </div>

        <div className="text-center pt-2">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
            ← 回到作品集
          </Link>
        </div>
      </div>
    </main>
  )
}
