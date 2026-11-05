import { PROJECTS } from '@/lib/portfolio/projects'
import ProjectDetailClient from './ProjectDetailClient'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return PROJECTS.map(p => ({ id: p.id }))
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = PROJECTS.find(p => p.id === id)
  if (!project) notFound()
  return <ProjectDetailClient project={project} />
}
