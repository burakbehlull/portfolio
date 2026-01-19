"use client";

import Link from "next/link";
import { ArrowRight, Globe, Github } from "lucide-react";
import { useLanguage } from "@/context/language-context";

interface ProjectProps {
  project: {
    _id: string;
    title: string;
    description: string;
    image?: string;
    tags?: string[];
    demoLink?: string;
    repoLink?: string;
  };
}

export function ProjectCard({ project }: ProjectProps) {
  const { t } = useLanguage();

  return (
    <div className="group flex flex-col md:flex-row gap-6 items-start">
      <Link href={`/projects/${project._id}`} className="w-full md:w-48 aspect-video md:aspect-[4/3] shrink-0 overflow-hidden rounded-xl bg-zinc-100 border border-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 block">
        {project.image ? (
           <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-zinc-300 dark:text-zinc-700">No Image</div>
        )}
      </Link>
      <div className="space-y-3 flex-1">
        <Link href={`/projects/${project._id}`}>
            <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white group-hover:text-black dark:group-hover:text-zinc-200 transition-colors">
            {project.title}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 line-clamp-2">{project.description}</p>
        </Link>
        
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium pt-1">
          <Link href={`/projects/${project._id}`} className="flex items-center gap-1 text-black dark:text-white hover:underline">
            {t('viewProject')} <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>
          
          {project.demoLink && (
             <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                <Globe className="w-3.5 h-3.5" /> {t('viewDemo')}
             </a>
          )}
          
          {project.repoLink && (
             <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                <Github className="w-3.5 h-3.5" /> {t('viewSource')}
             </a>
          )}
        </div>
      </div>
    </div>
  );
}
