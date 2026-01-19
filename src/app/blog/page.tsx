import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import BlogContent from "@/components/blog-content";

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

  return <BlogContent blogs={blogs} totalPages={totalPages} currentPage={currentPage} />;
}
