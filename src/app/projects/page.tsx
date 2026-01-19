import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import ProjectsContent from "@/components/projects-content";

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

  return <ProjectsContent projects={projects} totalPages={totalPages} currentPage={currentPage} />;
}
