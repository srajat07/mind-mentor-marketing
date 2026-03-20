"use client";

import { useState, useEffect } from "react";
import { FileText, ClipboardList, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [quizCount, setQuizCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        const data = await response.json();
        
        if (response.ok) {
          setBlogCount(data.blogCount);
          setQuizCount(data.quizCount);
        } else {
          setBlogCount(0);
          setQuizCount(0);
          console.error("Failed to fetch stats:", data.error);
        }
      } catch (error) {
        setBlogCount(0);
        setQuizCount(0);
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { 
      name: "Total Blog Posts", 
      value: loading ? "..." : (blogCount ?? 0).toString(), 
      icon: FileText, 
      color: "text-blue-600", 
      bg: "bg-blue-100",
      isLoading: loading
    },
    { 
      name: "Active Quizzes", 
      value: loading ? "..." : (quizCount ?? 0).toString(), 
      icon: ClipboardList, 
      color: "text-purple-600", 
      bg: "bg-purple-100",
      isLoading: loading
    },
    { name: "Total Users", value: "119,432", icon: Users, color: "text-emerald-600", bg: "bg-emerald-100" },
    { name: "Growth Rate", value: "+12.5%", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-hover hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-2xl font-bold text-slate-800 ${(stat as any).isLoading ? 'animate-pulse' : ''}`}>{stat.value}</span>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[
              { action: "New blog post published", time: "2 hours ago", author: "Admin" },
              { action: "Quiz 'AI Readiness' updated", time: "5 hours ago", author: "Vlada K." },
              { action: "Questionnaire logic adjusted", time: "Yesterday", author: "Sahil R." },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                <div>
                  <p className="font-medium text-slate-800">{activity.action}</p>
                  <p className="text-sm text-slate-500">{activity.time} • by {activity.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Shortcuts</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/blog" className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group">
              <FileText className="text-slate-400 group-hover:text-blue-500 mb-2" size={32} />
              <span className="text-sm font-semibold text-slate-600 group-hover:text-blue-600 text-center">Manage Articles</span>
            </Link>
            <Link href="/admin/quiz" className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer group">
              <ClipboardList className="text-slate-400 group-hover:text-purple-500 mb-2" size={32} />
              <span className="text-sm font-semibold text-slate-600 group-hover:text-purple-600 text-center">Update Quizzes</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
