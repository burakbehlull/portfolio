import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogCard } from "@/components/BlogCard";

// Helper to fetch data safely
async function getData() {
  await dbConnect();
  const projects = await Project.find({}).sort({ createdAt: -1 }).limit(3).lean();
  const blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(4).lean();
  // Serialization for Next.js (mongoose _id is object)
  return {
    projects: JSON.parse(JSON.stringify(projects)),
    blogs: JSON.parse(JSON.stringify(blogs)),
  };
}

export default async function Home() {
  const { projects, blogs } = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center pt-32 pb-12 px-6">
      {/* Hero Section */}
      <section className="w-full max-w-2xl text-center flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-zinc-100 shadow-sm">
             {/* Using a placeholder or the uploaded images if I had their paths, 
                for now standard placeholder or one of the paths if I knew where they ended up 
                The user uploaded images to .gemini I can't access them directly via http 
                unless I move them. I'll use a placeholder for now. */}
            <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-zinc-400">
               Avatar
            </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
            Hey, I'm [Your Name] <br/>
            <span className="text-zinc-500">Creative Developer</span>
          </h1>
          <p className="text-lg text-zinc-600 max-w-lg mx-auto leading-relaxed">
            I craft intuitive digital experiences where design meets functionality. 
            Based in [Location], bringing ideas to life through code and creativity.
          </p>
        </div>

        <div className="flex items-center gap-4 pt-4">
           <Link 
             href="/contact" // Assuming contact or email 
             className="px-6 py-2.5 bg-black text-white rounded-full font-medium text-sm hover:bg-zinc-800 transition-colors"
           >
             Let's talk
           </Link>
           <Link 
             href="/about" 
             className="px-6 py-2.5 bg-zinc-100 text-zinc-900 rounded-full font-medium text-sm hover:bg-zinc-200 transition-colors"
           >
             More about me
           </Link>
        </div>
      </section>

      <div className="w-full max-w-4xl h-px bg-zinc-100 my-24"></div>

      {/* Projects Section */}
      <section className="w-full max-w-4xl space-y-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Selected Projects</h2>
          <Link href="/projects" className="text-sm font-medium text-zinc-500 hover:text-black flex items-center gap-2">
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project: any) => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <p className="col-span-3 text-center text-zinc-400 py-12">No projects found. Add some in the admin panel.</p>
          )}
        </div>
      </section>

      <div className="w-full max-w-4xl h-px bg-zinc-100 my-24"></div>

      {/* Blog Section */}
      <section className="w-full max-w-4xl space-y-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Latest Articles</h2>
          <Link href="/blog" className="text-sm font-medium text-zinc-500 hover:text-black flex items-center gap-2">
            Read all articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
           {blogs.length > 0 ? (
            blogs.map((blog: any) => (
              <BlogCard key={blog._id} post={blog} />
            ))
          ) : (
            <p className="col-span-2 text-center text-zinc-400 py-12">No articles found. Add some in the admin panel.</p>
          )}
        </div>
      </section>
    </main>
  );
}
