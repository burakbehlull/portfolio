"use client";

import "client-only";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, Github, Twitter, Linkedin } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Speaking", href: "/speaking" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-3 rounded-full border border-black/10 bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm transition-all w-[90%] md:w-fit justify-between md:justify-start">
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-black dark:hover:text-white",
                pathname === item.href ? "text-black dark:text-white" : "text-zinc-500 dark:text-zinc-400"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -ml-2 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="font-medium text-sm">Menu</span>
        </div>

        <div className="flex items-center gap-4 pl-4 border-l border-zinc-200 dark:border-zinc-800">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl md:hidden origin-top"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === item.href 
                      ? "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white" 
                      : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="w-full max-w-4xl mx-auto py-12 px-6 mt-20 flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm">
      <p>Built with Next.js • © {new Date().getFullYear()}</p>
      <div className="flex items-center gap-6 mt-4 md:mt-0">
        <Link href="#" className="hover:text-black transition-colors">
          <Github className="w-5 h-5" />
        </Link>
        <Link href="#" className="hover:text-black transition-colors">
          <Twitter className="w-5 h-5" />
        </Link>
        <Link href="#" className="hover:text-black transition-colors">
          <Linkedin className="w-5 h-5" />
        </Link>
      </div>
    </footer>
  );
}
