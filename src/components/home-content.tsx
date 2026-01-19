"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogCard } from "@/components/BlogCard";
import { useLanguage } from "@/context/language-context";
import { AboutWorkSection } from "@/components/about-work-section";

export default function HomeContent({ projects, blogs }: { projects: any[], blogs: any[] }) {
  const { t } = useLanguage();

  return (
    <main className="flex min-h-screen flex-col items-center pt-32 pb-12 px-6">
      {/* Hero Section */}
      <section className="w-full max-w-2xl text-center flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-zinc-100 dark:border-zinc-800 shadow-sm">
            <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-400">
               Avatar
            </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {t('heroTitle')} <br/>
            <span className="text-zinc-500 dark:text-zinc-400">{t('heroSubtitle')}</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>
        </div>

        <div className="flex items-center gap-4 pt-4">
           <Link 
             href="/contact"
             className="px-6 py-2.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-full font-medium text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
           >
             {t('letsTalk')}
           </Link>
           <Link 
             href="/about" 
             className="px-6 py-2.5 bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 rounded-full font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
           >
             {t('moreAboutMe')}
           </Link>
        </div>
      </section>

      <div className="w-full max-w-4xl h-px bg-zinc-100 dark:bg-zinc-800 my-24"></div>

      <AboutWorkSection />

      <div className="w-full max-w-4xl h-px bg-zinc-100 dark:bg-zinc-800 my-24"></div>

      {/* Projects Section */}
      <section className="w-full max-w-4xl space-y-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight light:text-zinc-900 dark:text-white">{t('selectedProjects')}</h2>
          <Link href="/projects" className="text-sm font-medium light:text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-2">
            {t('viewAllProjects')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-12">
          {projects.length > 0 ? (
            projects.map((project: any) => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <p className="col-span-3 text-center text-zinc-400 dark:text-zinc-400 py-12">{t('noProjects')}</p>
          )}
        </div>
      </section>

      <div className="w-full max-w-4xl h-px bg-zinc-100 dark:bg-zinc-800 my-24"></div>

      {/* Blog Section */}
      <section className="w-full max-w-4xl space-y-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight light:text-zinc-900 dark:text-white">{t('latestArticles')}</h2>
          <Link href="/blog" className="text-sm font-medium light:text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center gap-2">
            {t('readAllArticles')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
           {blogs.length > 0 ? (
            blogs.map((blog: any) => (
              <BlogCard key={blog._id} post={blog} />
            ))
          ) : (
            <p className="col-span-2 text-center text-zinc-400 dark:text-zinc-400 py-12">{t('noArticles')}</p>
          )}
        </div>
      </section>
    </main>
  );
}
