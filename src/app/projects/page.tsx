import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import { ProjectCard } from "@/components/ProjectCard";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

async function getProjects(page: number) {
  const LIMIT = 4;
  await dbConnect();
  
  const total = await Project.countDocuments();
  const projects = await Project.find({})
    .sort({ createdAt: -1 })
    .skip((page - 1) * LIMIT)
    .limit(LIMIT)
    .lean();
    
  return {
    projects: JSON.parse(JSON.stringify(projects)),
    totalPages: Math.ceil(total / LIMIT),
    currentPage: page
  };
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
  const { projects, totalPages, currentPage } = await getProjects(page);

  return (
    <main className="min-h-screen pt-32 pb-12 px-6 max-w-4xl mx-auto">
      <div className="space-y-4 mb-16 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Projects</h1>
        <p className="text-zinc-500 max-w-xl">
          A collection of projects I've worked on, ranging from web applications to design systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.length > 0 ? (
          projects.map((project: any) => (
            <ProjectCard key={project._id} project={project} />
          ))
        ) : (
          <p className="text-zinc-500">No projects found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-16">
          <Link
            href={`/projects?page=${currentPage - 1}`}
            className={`p-2 rounded-full border border-zinc-200 hover:bg-zinc-50 ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}`}
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="text-sm font-medium text-zinc-600">
            Page {currentPage} of {totalPages}
          </span>
          <Link
            href={`/projects?page=${currentPage + 1}`}
            className={`p-2 rounded-full border border-zinc-200 hover:bg-zinc-50 ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </main>
  );
}
