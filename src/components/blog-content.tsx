"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { useLanguage } from "@/context/language-context";

export default function BlogContent({ blogs, totalPages, currentPage }: { blogs: any[], totalPages: number, currentPage: number }) {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen pt-32 pb-12 px-6 max-w-4xl mx-auto">
      <div className="space-y-4 mb-16 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">{t('blogTitle')}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-xl">
          {t('blogDescription')}
        </p>
      </div>

      <div className="space-y-12">
        {blogs.length > 0 ? (
          blogs.map((blog: any) => (
            <BlogCard key={blog._id} post={blog} />
          ))
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400">{t('noArticles')}</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-16">
          <Link
            href={`/blog?page=${currentPage - 1}`}
            className={`p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}`}
          >
            <ArrowLeft className="w-4 h-4 text-black dark:text-white" />
          </Link>
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
             {t('page')} {currentPage} {t('of')} {totalPages}
          </span>
          <Link
            href={`/blog?page=${currentPage + 1}`}
            className={`p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
          >
            <ArrowRight className="w-4 h-4 text-black dark:text-white" />
          </Link>
        </div>
      )}
    </main>
  );
}
