"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, X, Image as ImageIcon, Check, ChevronDown } from "lucide-react";
import { getBlogs, createBlog, updateBlog, deleteBlog, getCategories, getTags } from "@/app/actions/blogActions";

export default function BlogManagement() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Controlled form state for new/editing post
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    tags: [] as string[],
    imageUrl: "",
    excerpt: "",
    content: "",
    status: "draft",
    author: {
      name: "Mind Mentor Admin",
      avatar: "AI"
    }
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [blogsData, catsData, tagsData] = await Promise.all([
      getBlogs(),
      getCategories(),
      getTags()
    ]);
    setPosts(blogsData);
    setCategories(catsData);
    setTags(tagsData);

    // Initialize default category if none selected and categories exist
    if (catsData.length > 0 && !formData.category) {
      setFormData(prev => ({ ...prev, category: catsData[0]._id }));
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || post.category?._id === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Ensure image logic
    const sanitizedData = { ...formData };
    if (!sanitizedData.imageUrl) {
      sanitizedData.imageUrl = "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800";
    }

    if (editingId) {
      await updateBlog(editingId, sanitizedData);
    } else {
      await createBlog(sanitizedData);
    }
    resetForm();
    loadData();
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure?")) {
      await deleteBlog(id);
      loadData();
    }
  }

  function handleEdit(post: any) {
    setEditingId(post._id);
    setFormData({
      title: post.title,
      slug: post.slug,
      category: post.category?._id || "",
      tags: post.tags?.map((t: any) => t._id) || [],
      imageUrl: post.imageUrl || post.featuredImage || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      status: post.status || "draft",
      author: post.author || { name: "Mind Mentor AI", avatar: "AI" }
    });
    setIsModalOpen(true);
  }

  function resetForm() {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      category: categories[0]?._id || "",
      tags: [],
      imageUrl: "",
      excerpt: "",
      content: "",
      status: "draft",
      author: { name: "Mind Mentor Admin", avatar: "AI" }
    });
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Articles</h2>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm shadow-blue-200 cursor-pointer"
        >
          <Plus size={20} />
          Create New Post
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by title or excerpt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/10"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/10"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-[15px]">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Post Details</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredPosts.map((post) => (
              <tr key={post._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden relative shrink-0">
                      <img src={post.featuredImage || post.imageUrl || "https://placehold.co/100"} alt="" className="object-cover w-full h-full" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 truncate">{post.title}</p>
                      <p className="text-xs text-slate-500 truncate mt-1">/{post.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold uppercase tracking-wider">
                    {post.category?.name || "Uncategorized"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold border ${post.status === "published"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-amber-50 text-amber-700 border-amber-100"
                    }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${post.status === "published" ? "bg-emerald-500" : "bg-amber-500"}`}></div>
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleEdit(post)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(post._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPosts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-500">No articles found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <form onSubmit={handleSubmit} className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">{editingId ? "Edit Article" : "Create New Article"}</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-2">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Article Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter title..."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-lg font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Excerpt</label>
                    <textarea
                      rows={3}
                      placeholder="Write a short teaser..."
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white"
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Featured Image URL</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Tags</label>
                  <div className="flex flex-wrap gap-2 p-2 border border-slate-200 rounded-lg bg-white">
                    {tags.map(tag => {
                      const isSelected = formData.tags.includes(tag._id);
                      return (
                        <button
                          key={tag._id}
                          type="button"
                          onClick={() => {
                            const newTags = isSelected
                              ? formData.tags.filter(id => id !== tag._id)
                              : [...formData.tags, tag._id];
                            setFormData({ ...formData, tags: newTags });
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${isSelected
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                        >
                          {tag.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Article Content (Markdown/HTML)</label>
                <textarea
                  rows={12}
                  required
                  placeholder="Start writing your masterwork..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-mono text-sm"
                />
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50 rounded-b-2xl">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all cursor-pointer shadow-lg shadow-blue-200"
              >
                {editingId ? "Update Article" : "Save Article"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
