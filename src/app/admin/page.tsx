"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Loader2, Plus, Trash, Pencil } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("admin_token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  return <Dashboard />;
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        onLogin();
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-zinc-200 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-black text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
    </div>
  );
}

function Dashboard() {
  const [tab, setTab] = useState<"projects" | "blogs">("projects");
  const [view, setView] = useState<"list" | "create">("list");
  
  // Data states
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // Fetch loading

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${tab}`);
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    setView("list");
  }, [tab]);

  return (
    <div className="min-h-screen pt-32 px-6 pb-12 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="space-x-4">
            <button 
                onClick={() => setTab("projects")} 
                className={`px-4 py-2 rounded-md ${tab === "projects" ? "bg-black text-white" : "text-zinc-500"}`}
            >
                Projects
            </button>
            <button 
                onClick={() => setTab("blogs")} 
                className={`px-4 py-2 rounded-md ${tab === "blogs" ? "bg-black text-white" : "text-zinc-500"}`}
            >
                Blog
            </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 p-6 min-h-[500px]">
        {view === "list" ? (
            <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold capitalize">{tab} List</h2>
                    <button onClick={() => setView("create")} className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-zinc-800">
                        <Plus className="w-4 h-4" /> Add New
                    </button>
                 </div>
                 
                 {loading ? <p>Loading...</p> : (
                    <div className="space-y-4">
                        {items.length === 0 ? <p className="text-zinc-500">No items found.</p> : items.map((item) => (
                            <div key={item._id} className="flex items-center justify-between p-4 border border-zinc-100 rounded-lg hover:bg-zinc-50">
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-xs text-zinc-400">{new Date(item.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                 )}
            </div>
        ) : (
            <CreateForm type={tab} onCancel={() => setView("list")} onSuccess={() => { setView("list"); fetchItems(); }} />
        )}
      </div>
    </div>
  );
}

function CreateForm({ type, onCancel, onSuccess }: { type: "projects" | "blogs", onCancel: () => void, onSuccess: () => void }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "", // Only for projects check
        excerpt: "", // Only for blogs check
        slug: "", // Only for blogs
        image: "",
        content: "",
        demoLink: "",
        repoLink: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch(`/api/${type}`, {
                method: "POST",
                body: JSON.stringify(formData),
            });
            onSuccess();
        } catch (error) {
            alert("Failed to create");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
             <h2 className="text-xl font-semibold mb-6 capitalize">Add New {type === "projects" ? "Project" : "Post"}</h2>
             
             <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <input required className="w-full border p-2 rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
             </div>

             {type === "blogs" && (
                <div className="space-y-2">
                    <label className="text-sm font-medium">Slug (unique-url)</label>
                    <input required className="w-full border p-2 rounded" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                </div>
             )}

             {type === "projects" ? (
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea required className="w-full border p-2 rounded" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                 </div>
             ) : (
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Excerpt (Short summary)</label>
                    <textarea required className="w-full border p-2 rounded" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
                 </div>
             )}

             <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <input className="w-full border p-2 rounded" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
             </div>

             <div className="space-y-2">
                <label className="text-sm font-medium">Content (Markdown)</label>
                <textarea required rows={10} className="w-full border p-2 rounded font-mono text-sm" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
             </div>
             
             {type === "projects" && (
                 <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Demo Link</label>
                        <input className="w-full border p-2 rounded" value={formData.demoLink} onChange={e => setFormData({...formData, demoLink: e.target.value})} />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Repo Link</label>
                        <input className="w-full border p-2 rounded" value={formData.repoLink} onChange={e => setFormData({...formData, repoLink: e.target.value})} />
                     </div>
                 </div>
             )}

             <div className="flex gap-4 pt-4">
                 <button type="button" onClick={onCancel} className="px-4 py-2 border rounded hover:bg-zinc-50">Cancel</button>
                 <button type="submit" disabled={loading} className="px-4 py-2 bg-black text-white rounded hover:bg-zinc-800">{loading ? "Saving..." : "Save"}</button>
             </div>
        </form>
    );
}
