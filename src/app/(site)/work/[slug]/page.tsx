import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/work";
import { ProjectDetail } from "@/features/work/ProjectDetail";
import { createPageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default async function Page({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
