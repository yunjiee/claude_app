'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import PageLayout from '@/components/layout/PageLayout'
import { PROJECTS, TECH_COLORS } from '@/lib/portfolio/projects'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4, delay },
})

export default function PortfolioPage() {
  const featured = PROJECTS[0]
  const rest = PROJECTS.slice(1)

  return (
    <PageLayout title="作品集" description="個人開發作品展示">

      {/* ── Featured project ── */}
      <motion.div {...inView(0)}>
        <Link
          href={`/portfolio/${featured.id}`}
          className={`group mb-6 cursor-pointer relative overflow-hidden rounded-3xl border ${featured.border} bg-gradient-to-br ${featured.light} p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 block`}
        >
          <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${featured.gradient} rounded-l-3xl`} />
          <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br ${featured.gradient} opacity-10 blur-2xl`} />

          <div className="pl-4">
            <span className={`text-[11px] font-bold tracking-[.16em] uppercase ${featured.accent} mb-3 block`}>精選作品</span>

            <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-5">
              <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${featured.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                {featured.emoji}
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">{featured.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed max-w-lg">{featured.shortDesc}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {featured.tech.map(t => (
                <span key={t} className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${TECH_COLORS[t] ?? 'bg-white text-gray-700 border border-gray-200'}`}>{t}</span>
              ))}
            </div>

            <div className={`inline-flex items-center gap-2 text-sm font-bold ${featured.accent} group-hover:gap-3 transition-all`}>
              <span>查看詳情</span>
              <span>→</span>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* ── Project grid ── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project, i) => (
          <motion.div key={project.id} {...inView(i * 0.07 + 0.1)}>
            <Link
              href={`/portfolio/${project.id}`}
              className="group cursor-pointer relative flex flex-col rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full"
            >
              <div className={`relative flex items-end gap-3 bg-gradient-to-br ${project.gradient} px-6 pt-5 pb-4 overflow-hidden`}>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/3" />
                <div className="text-4xl drop-shadow">{project.emoji}</div>
                <h2 className="text-sm font-bold text-white drop-shadow pb-0.5">{project.title}</h2>
              </div>

              <div className="flex-1 flex flex-col p-5 bg-white">
                <p className="text-xs text-gray-400 leading-relaxed flex-1">{project.shortDesc}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.map(t => (
                    <span key={t} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${TECH_COLORS[t] ?? 'bg-gray-100 text-gray-600'}`}>{t}</span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-gray-300 group-hover:text-gray-600 group-hover:gap-2 transition-all">
                  <span>查看詳情</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

    </PageLayout>
  )
}
