import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import { BlogCard } from "@/components/BlogCard";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

async function getBlogs(page: number) {
  const LIMIT = 4;
  await dbConnect();
  
  const total = await Blog.countDocuments();
  const blogs = await Blog.find({})
    .sort({ createdAt: -1 })
    .skip((page - 1) * LIMIT)
    .limit(LIMIT)
    .lean();
    
  return {
    blogs: JSON.parse(JSON.stringify(blogs)),
    totalPages: Math.ceil(total / LIMIT),
    currentPage: page
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
  const { blogs, totalPages, currentPage } = await getBlogs(page);

  return (
    <main className="min-h-screen pt-32 pb-12 px-6 max-w-4xl mx-auto">
      <div className="space-y-4 mb-16 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Blog</h1>
        <p className="text-zinc-500 max-w-xl">
          Thoughts on design, development, and the future of the web.
        </p>
      </div>

      <div className="space-y-12">
        {blogs.length > 0 ? (
          blogs.map((blog: any) => (
            <BlogCard key={blog._id} post={blog} />
          ))
        ) : (
          <p className="text-zinc-500">No articles found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-16">
          <Link
            href={`/blog?page=${currentPage - 1}`}
            className={`p-2 rounded-full border border-zinc-200 hover:bg-zinc-50 ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}`}
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="text-sm font-medium text-zinc-600">
             Page {currentPage} of {totalPages}
          </span>
          <Link
            href={`/blog?page=${currentPage + 1}`}
            className={`p-2 rounded-full border border-zinc-200 hover:bg-zinc-50 ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </main>
  );
}
