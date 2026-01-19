import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";

async function getBlog(slug: string) {
  await dbConnect();
  const post = await Blog.findOne({ slug }).lean();
  if (!post) return null;
  return JSON.parse(JSON.stringify(post));
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = await getBlog(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Article not found</p>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-32 pb-20 px-6 max-w-3xl mx-auto">
      <Link href="/blog" className="inline-flex items-center text-sm text-zinc-500 hover:text-black mb-12">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to blog
      </Link>

      <header className="mb-12 space-y-6">
        <div className="space-y-2">
           <time className="text-sm text-zinc-400">
            {new Date(post.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">
            {post.title}
          </h1>
        </div>
      </header>

      {post.image && (
        <div className="mb-12 rounded-xl overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-auto" />
        </div>
      )}

      <div className="prose prose-zinc prose-lg max-w-none">
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h2 className="text-3xl font-bold mt-12 mb-6" {...props} />,
            h2: ({node, ...props}) => <h3 className="text-2xl font-bold mt-10 mb-4" {...props} />,
            p: ({node, ...props}) => <p className="leading-relaxed mb-6 text-zinc-700 text-lg" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-6 space-y-2 text-zinc-700" {...props} />,
            li: ({node, ...props}) => <li className="" {...props} />,
             blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-zinc-200 pl-4 italic text-zinc-600 my-8" {...props} />,
            code: ({node, ...props}) => <code className="bg-zinc-100 px-1 py-0.5 rounded text-sm font-mono text-zinc-800" {...props} />,
            img: ({node, ...props}) => <img className="rounded-lg my-8 w-full" {...props} />,
          }}
        >
            {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
