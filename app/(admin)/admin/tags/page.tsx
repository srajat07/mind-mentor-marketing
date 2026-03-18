"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { getTags, createTag, deleteTag } from "@/app/actions/blogActions";

export default function TagsPage() {
  const [tags, setTags] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTag, setNewTag] = useState({ name: "", description: "" });

  useEffect(() => {
    loadTags();
  }, []);

  async function loadTags() {
    const data = await getTags();
    setTags(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createTag(newTag);
    setNewTag({ name: "", description: "" });
    setIsModalOpen(false);
    loadTags();
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure?")) {
      await deleteTag(id);
      loadTags();
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Tags</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-purple-700 transition-all cursor-pointer shadow-sm shadow-purple-200"
        >
          <Plus size={20} />
          Add Tag
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Slug</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tags.map((tag) => (
              <tr key={tag._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-800">{tag.name}</td>
                <td className="px-6 py-4 text-sm text-slate-500">#{tag.slug}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{tag.description || "-"}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleDelete(tag._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <form onSubmit={handleSubmit} className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">Add New Tag</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Name</label>
                <input
                  type="text"
                  required
                  value={newTag.name}
                  onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Description</label>
                <textarea
                  rows={3}
                  value={newTag.description}
                  onChange={(e) => setNewTag({ ...newTag, description: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none resize-none"
                />
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 font-bold text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-purple-700 shadow-lg shadow-purple-200 cursor-pointer"
              >
                Save Tag
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
