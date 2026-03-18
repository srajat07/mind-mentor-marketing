"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Clock, ChevronRight, User } from "lucide-react";

import { getBlogs, getCategories } from "@/app/actions/blogActions";

function BlogCard({ post }: { post: any }) {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-2xl border border-[#E3E3E3] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 flex items-center justify-center">
        {!imageError ? (
          <Image
            src={post.featuredImage || post.imageUrl || fallbackImage}
            alt={post.title}
            fill
            unoptimized
            onError={() => setImageError(true)}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#5653FE]/10 to-[#5653FE]/5 flex items-center justify-center">
            <span className="text-[#5653FE] font-bold text-lg">Mind Mentor AI</span>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm z-10">
          <span className="text-[11px] font-bold text-[#5653FE] tracking-wider uppercase">
            {post.category?.name || "AI Tools"}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg z-10">
          <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
            <Clock size={12} />
            {post.readTime || "5 MIN"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#24234C] mb-3 group-hover:text-[#5653FE] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-[#4F5B76] mb-6 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-[#F3F4F6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F3F4FE] flex items-center justify-center border border-[#E9E9FF]">
              <span className="text-[11px] font-bold text-[#5653FE]">
                {post.author?.avatar?.substring(0, 2) || "MM"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-[#24234C]">{post.author?.name || "Admin"}</span>
            </div>
          </div>
          <span className="text-[12px] text-[#4F5B76] font-medium">
            {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [visiblePostsCount, setVisiblePostsCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      const [blogsData, catsData] = await Promise.all([
        getBlogs({ status: "published" }),
        getCategories()
      ]);
      setAllPosts(blogsData);
      setCategories(catsData);
    }
    fetchData();
  }, []);

  const categoriesList = useMemo(() => ["All Articles", ...categories.map(c => c.name)], [categories]);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All Articles" ||
        post.category?.name === activeCategory;

      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.name?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [allPosts, activeCategory, searchQuery]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisiblePostsCount(6);
  }, [activeCategory, searchQuery]);

  // Infinite Scroll Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && visiblePostsCount < filteredPosts.length) {
          setIsLoadingMore(true);

          // Simulate API delay
          setTimeout(() => {
            setVisiblePostsCount((prev) => prev + 3);
            setIsLoadingMore(false);
          }, 800);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [isLoadingMore, visiblePostsCount, filteredPosts.length]);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="py-16 bg-[#F9FAFB] bg-[radial-gradient(ellipse_at_top,_#EFF6FF_0%,_#F9FAFB_70%)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-[#24234C] mb-6 tracking-tight">
              Mind Mentor Blog
            </h1>
            <p className="text-xl text-[#4F5B76] mb-10 leading-relaxed">
              Practical guides on AI tools, automation, and what's changing across industries. Learn how to stay ahead in the era of artificial intelligence.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-[#9CA3AF] group-focus-within:text-[#5653FE] transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 border border-[#E3E3E3] rounded-full focus:outline-none focus:ring-2 focus:ring-[#5653FE]/10 focus:border-[#5653FE] transition-all bg-white shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-[#E3E3E3]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide py-4 no-scrollbar">
            {categoriesList.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap text-[15px] font-semibold cursor-pointer transition-all relative py-2 ${activeCategory === category
                  ? "text-[#5653FE]"
                  : "text-[#4F5B76] hover:text-[#24234C]"
                  }`}
              >
                {category}
                {activeCategory === category && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5653FE] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredPosts.slice(0, visiblePostsCount).map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-lg text-[#4F5B76]">No articles found matching your criteria.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All Articles"); }}
                className="mt-4 text-[#5653FE] font-semibold hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Infinite Scroll Loader */}
          {visiblePostsCount < filteredPosts.length && (
            <div ref={loaderRef} className="flex flex-col items-center justify-center py-12 border-t border-[#F3F4F6]">
              {isLoadingMore ? (
                <>
                  <div className="w-8 h-8 border-2 border-[#5653FE]/20 border-t-[#5653FE] rounded-full animate-spin mb-4" />
                  <span className="text-[#4F5B76] font-medium text-sm tracking-wide">
                    Loading more articles...
                  </span>
                </>
              ) : (
                <div className="h-20" /> /* Reserved space for observer */
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
