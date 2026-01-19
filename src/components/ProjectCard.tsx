import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ProjectProps {
  project: {
    _id: string;
    title: string;
    description: string;
    image?: string;
    tags?: string[];
  };
}

export function ProjectCard({ project }: ProjectProps) {
  return (
    <Link href={`/projects/${project._id}`} className="group block">
      <div className="space-y-4">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-100">
          {project.image ? (
             <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-zinc-300">No Image</div>
          )}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-zinc-900 group-hover:text-black">
            {project.title}
          </h3>
          <p className="text-zinc-500 line-clamp-2">{project.description}</p>
          <div className="flex items-center gap-2 text-sm font-medium text-black">
            View Project <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
