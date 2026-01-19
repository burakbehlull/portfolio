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
      <div className="w-32 h-24 shrink-0 overflow-hidden rounded-lg light:bg-zinc-100 light:border light:border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
        {post.image ? (
            <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
           <div className="h-full w-full flex items-center justify-center light:text-zinc-300 dark:text-zinc-400 text-xs">No Image</div>
        )}
      </div>
      <div className="space-y-2">
        <span className="text-xs font-medium text-zinc-400 dark:text-zinc-400">
          {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white group-hover:text-black dark:group-hover:text-zinc-200 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
}
