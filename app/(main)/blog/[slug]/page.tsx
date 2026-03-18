"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ChevronRight, User } from "lucide-react";

import { getBlogBySlug } from "@/app/actions/blogActions";

interface ToCItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState<ToCItem[]>([]);

  useEffect(() => {
    async function loadPost() {
      const data = await getBlogBySlug(slug);
      setPost(data);
      setLoading(false);
    }
    loadPost();
  }, [slug]);

  useEffect(() => {
    if (!post) return;

    // Generate Table of Contents
    const contentArea = document.getElementById("article-content");
    if (contentArea) {
      const headers = Array.from(contentArea.querySelectorAll("h2, h3"));
      const tocItems: ToCItem[] = headers.map((header) => {
        const text = header.textContent || "";
        const id = text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
        header.id = id;
        return {
          id,
          text,
          level: parseInt(header.tagName.replace("H", ""))
        };
      });
      setToc(tocItems);
    }
  }, [post]);

  // Handle initial hash in URL
  useEffect(() => {
    if (toc.length > 0 && typeof window !== 'undefined' && window.location.hash) {
      const id = decodeURIComponent(window.location.hash.substring(1));
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure everything is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [toc]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#5653FE]/20 border-t-[#5653FE] rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#24234C] mb-4">Post not found</h1>
          <Link href="/blog" className="text-[#5653FE] hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-[#4F5B76] mb-12">
          <Link href="/" className="hover:text-[#5653FE]">Home</Link>
          <span className="text-[#E3E3E3]">»</span>
          <Link href="/blog" className="hover:text-[#5653FE]">Blog</Link>
          <span className="text-[#E3E3E3]">»</span>
          <span className="truncate max-w-[200px]">{post.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16">

          <article className="lg:w-[800px] flex-shrink-0">
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-[#24234C] mb-6 leading-tight tracking-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[#4F5B76] mb-8">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{post.author?.name || "Admin"}</span>
                </div>
                <span className="text-[#E3E3E3] hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readTime || "5 MIN"}</span>
                </div>
                <span className="text-[#E3E3E3] hidden sm:inline">•</span>
                <span>Published {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
              </div>

              <p className="text-xl text-[#4F5B76] leading-relaxed mb-10 font-medium">
                {post.excerpt}
              </p>

              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-12 shadow-lg">
                <Image
                  src={post.featuredImage || post.imageUrl || "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </header>

            <div className="relative p-8 md:p-12 mb-16 rounded-[2rem] overflow-hidden group">
              <div className="absolute inset-0 border-[6px] border-[#5653FE]/5 rounded-[2rem]"></div>
              <div className="absolute inset-2 border-[1px] border-[#5653FE]/20 rounded-[1.8rem]"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-[#5653FE] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#5653FE]/20">
                    <span className="font-bold text-2xl">M</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#24234C] mb-2">Make your job easier</h3>
                    <p className="text-[#4F5B76]">by mastering <span className="text-[#5653FE] font-bold">AI Tools</span></p>
                  </div>
                </div>
                <Link
                  href="/"
                  className="bg-[#5653FE] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#4845E5] transition-all shadow-lg shadow-[#5653FE]/20 hover:scale-105 active:scale-95"
                >
                  Join Mind Mentor
                </Link>
              </div>
            </div>

            <div className="block lg:hidden mb-12">
              <ToC toc={toc} onScroll={handleScroll} />
            </div>

            <div
              id="article-content"
              className="prose prose-lg max-w-none prose-headings:text-[#24234C] prose-headings:font-bold prose-headings:tracking-tight prose-p:text-[#4F5B76] prose-p:leading-relaxed prose-li:text-[#4F5B76] prose-strong:text-[#24234C]"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </article>

          <aside className="hidden lg:block w-[350px]">
            <div className="sticky top-32">
              <ToC toc={toc} onScroll={handleScroll} />

              <div className="mt-8 p-8 bg-[#F3F4FE] rounded-2xl border border-[#E9E9FF]">
                <h4 className="font-bold text-[#24234C] mb-4">Master AI Today</h4>
                <p className="text-sm text-[#4F5B76] mb-6">Join 119,000+ others learning to leverage AI in their daily workflow.</p>
                <Link
                  href="/"
                  className="block w-full text-center bg-white text-[#5653FE] border border-[#5653FE] py-3 rounded-lg font-bold hover:bg-[#5653FE] hover:text-white transition-all"
                >
                  View Plans
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx global>{`
        #article-content h2 { margin-top: 3rem; margin-bottom: 1.5rem; font-size: 2rem; scroll-margin-top: 6rem; }
        #article-content h3 { margin-top: 2rem; margin-bottom: 1rem; font-size: 1.5rem; scroll-margin-top: 6rem; }
        #article-content p { margin-bottom: 1.5rem; }
        #article-content ul { list-style-type: none; padding-left: 0; margin-bottom: 1.5rem; }
        #article-content li { position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; }
        #article-content li::before { 
          content: ""; 
          position: absolute; 
          left: 0; 
          top: 0.6em; 
          width: 8px; 
          height: 8px; 
          background: #5653FE; 
          border-radius: 50%; 
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}

function ToC({ toc, onScroll }: { toc: ToCItem[], onScroll: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void }) {
  if (toc.length === 0) return null;

  return (
    <div className="bg-[#F9FAFB] border border-[#E3E3E3] rounded-2xl p-8">
      <h3 className="font-bold text-[#24234C] mb-6 flex items-center gap-2">
        <ChevronRight size={18} className="rotate-90 text-[#5653FE]" />
        Table of Contents
      </h3>
      <ul className="space-y-4">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 1.5}rem` }}
            className="flex items-start gap-3"
          >
            <div className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${item.level === 2 ? "bg-[#5653FE]" : "border border-[#5653FE] bg-white"}`} />
            <a
              href={`#${item.id}`}
              onClick={(e) => onScroll(e, item.id)}
              className="text-[#4F5B76] hover:text-[#5653FE] transition-colors duration-300 leading-snug font-medium cursor-pointer"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
