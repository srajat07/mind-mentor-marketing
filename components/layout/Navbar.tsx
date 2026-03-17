"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Reviews", href: "/reviews" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/90 backdrop-blur-md border-b border-[#E3E3E3] shadow-sm"
        : "bg-transparent shadow-none border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center h-full">
            <Link href="/" className="text-[28px] tracking-tight font-bold text-[#24234C]">
              MindMentor
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-10 items-center h-full">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[16px] font-medium text-[#4F5B76] hover:text-[#5653FE] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-6 h-full">
            <Link href="#" className="font-semibold text-[16px] text-[#24234C] hover:text-[#5653FE] transition-colors">
              Log In
            </Link>
            <Link
              href="#"
              className="px-6 py-3 rounded-full bg-[#5653FE] text-white font-semibold hover:bg-[#5653FE]/90 hover:-translate-y-0.5 transition-all shadow-sm flex items-center justify-center text-[16px]"
            >
              Start Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center h-full">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border shadow-md"
          >
            <div className="px-6 pt-2 pb-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-3 text-base font-medium text-[#4F5B76] hover:bg-gray-50 hover:text-[#5653FE] rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3 px-3">
                <Link
                  href="#"
                  className="w-full text-center px-4 py-3 font-semibold text-[#24234C] hover:bg-gray-50 rounded-md border border-[#E3E3E3] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="#"
                  className="w-full text-center px-4 py-3 rounded-full bg-[#5653FE] text-white font-semibold hover:bg-[#5653FE]/90 shadow-sm transition-colors"
                >
                  Start Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
