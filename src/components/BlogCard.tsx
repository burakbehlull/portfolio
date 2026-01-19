import Link from "next/link";
import Image from "next/image";

interface BlogProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    image?: string;
    createdAt: string;
  };
}

export function BlogCard({ post }: BlogProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex gap-6 items-start">
      <div className="w-32 h-24 shrink-0 overflow-hidden rounded-lg bg-zinc-100 border border-zinc-100">
        {post.image ? (
            <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
           <div className="h-full w-full flex items-center justify-center text-zinc-300 text-xs">No Image</div>
        )}
      </div>
      <div className="space-y-2">
        <span className="text-xs font-medium text-zinc-400">
          {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <h3 className="text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-black">
          {post.title}
        </h3>
        <p className="text-sm text-zinc-500 line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
}
