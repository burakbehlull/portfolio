import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import HomeContent from "@/components/home-content";

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

  return <HomeContent projects={projects} blogs={blogs} />;
}
