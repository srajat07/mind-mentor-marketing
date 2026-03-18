"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, ClipboardList, LogOut, Menu, X, Settings2 } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/layout/Logo";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Blog Management", href: "/admin/blog", icon: FileText },
    { name: "Categories", href: "/admin/categories", icon: Settings2 },
    { name: "Tags", href: "/admin/tags", icon: Settings2 },
    { name: "Questionnaire Builder", href: "/admin/editor", icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`bg-[#1e293b] text-white fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-300 ease-in-out z-50 lg:relative lg:translate-x-0 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className={`p-4 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
          {!isCollapsed && <Logo isAdmin imageSize={32} textSize="text-lg" href="/admin" className="!gap-2" />}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors hidden lg:block"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="mt-6 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.name : ""}
                className={`flex items-center gap-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#5A4FCF] text-white shadow-lg shadow-[#5A4FCF]/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                } ${isCollapsed ? "justify-center px-0" : "px-4"}`}
              >
                <item.icon size={22} className="shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium text-sm whitespace-nowrap overflow-hidden transition-opacity duration-300">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
          <button
            className={`flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 transition-colors ${
              isCollapsed ? "justify-center px-0" : ""
            }`}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && (
              <span className="font-medium text-sm whitespace-nowrap overflow-hidden">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-slate-600 p-2 hover:bg-slate-100 rounded-lg"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-lg font-semibold text-slate-800">
              {navItems.find(item => pathname === item.href)?.name || "MindMentor Admin"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-slate-800">Admin User</span>
              <span className="text-xs text-slate-500">Super Admin</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300"></div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
