import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, Globe } from "lucide-react";
import ReactMarkdown from "react-markdown";

async function getProject(id: string) {
  await dbConnect();
  const project = await Project.findById(id).lean();
  if (!project) return null;
  return JSON.parse(JSON.stringify(project));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Project not found</p>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-32 pb-20 px-6 max-w-3xl mx-auto">
      <Link href="/projects" className="inline-flex items-center text-sm text-zinc-500 hover:text-black mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to projects
      </Link>

      <header className="mb-12 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">{project.title}</h1>
        <p className="text-xl text-zinc-600">{project.description}</p>
        
        <div className="flex flex-wrap gap-4 pt-4">
          {project.demoLink && (
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
              <Globe className="w-4 h-4" /> Live Demo
            </a>
          )}
          {project.repoLink && (
            <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors">
              <Github className="w-4 h-4" /> Source Code
            </a>
          )}
        </div>
      </header>

      {project.image && (
        <div className="mb-12 rounded-xl overflow-hidden border border-zinc-100 shadow-sm">
          <img src={project.image} alt={project.title} className="w-full h-auto object-cover" />
        </div>
      )}

      <div className="prose prose-zinc max-w-none">
        <ReactMarkdown
           components={{
            h1: ({node, ...props}) => <h2 className="text-3xl font-bold mt-8 mb-4 " {...props} />,
            h2: ({node, ...props}) => <h3 className="text-2xl font-semibold mt-8 mb-4" {...props} />,
            p: ({node, ...props}) => <p className="leading-relaxed mb-6 text-zinc-700" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-6 space-y-2 text-zinc-700" {...props} />,
            li: ({node, ...props}) => <li className="" {...props} />,
            a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
            code: ({node, ...props}) => <code className="bg-zinc-100 px-1 py-0.5 rounded text-sm font-mono text-zinc-800" {...props} />,
          }}
        >
            {project.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
