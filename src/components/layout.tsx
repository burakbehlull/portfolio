"use client";

import "client-only";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, Github, Twitter, Linkedin, Languages } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("projects"), href: "/projects" },
    { name: t("blog"), href: "/blog" },
    { name: t("about"), href: "/about" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "tr" : "en");
  };

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-3 rounded-full border border-black/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm transition-all w-[90%] md:w-fit justify-between md:justify-start">
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
            <span className="font-medium text-sm">{t("home")}</span> {/* Fallback label */}
        </div>

        <div className="flex items-center gap-2 pl-4 border-l border-zinc-200 dark:border-zinc-800">
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={language === "en" ? "Switch to Turkish" : "İngilizce'ye geç"}
          >
            {language === "en" ? (
                // US Flag (simplified)
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-5 h-5 rounded-sm shadow-sm object-cover">
                    <path fill="#bd3d44" d="M0 0h640v480H0"/>
                    <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
                    <path fill="#192f5d" d="M0 0h295.4v221.7H0"/>
                    <g fill="#fff">
                        <path d="M141.5 25.1l5.4 16.6 17.5-.1-14.2 10.3 5.4 16.6-14.1-10.3-14.2 10.3 5.4-16.6-14.2-10.3 17.5.1zM81.5 25.1l5.4 16.6 17.5-.1-14.2 10.3 5.4 16.6-14.1-10.3-14.2 10.3 5.4-16.6-14.2-10.3 17.5.1zM21.5 25.1l5.4 16.6 17.5-.1-14.2 10.3 5.4 16.6-14.1-10.3-14.2 10.3 5.4-16.6-14.2-10.3 17.5.1zM141.5 73.6l5.4 16.6 17.5-.1-14.2 10.3 5.4 16.6-14.1-10.3-14.2 10.3 5.4-16.6-14.2-10.3 17.5.1zM81.5 73.6l5.4 16.6 17.5-.1-14.2 10.3 5.4 16.6-14.1-10.3-14.2 10.3 5.4-16.6-14.2-10.3 17.5.1zM21.5 73.6l5.4 16.6 17.5-.1-14.2 10.3 5.4 16.6-14.1-10.3-14.2 10.3 5.4-16.6-14.2-10.3 17.5.1z"/>
                        <path d="M49.6 142.4l7.6 23.5 24.7-.2-20 14.5 7.6 23.5-20-14.6-20 14.6 7.6-23.5-20-14.5 24.7.2zM109.6 142.4l7.6 23.5 24.7-.2-20 14.5 7.6 23.5-20-14.6-20 14.6 7.6-23.5-20-14.5 24.7.2z" transform="scale(.525)"/>
                    </g>
                </svg>
            ) : (
                // TR Flag
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" className="w-5 h-5 rounded-sm shadow-sm object-cover">
                    <rect width="1200" height="800" fill="#E30A17"/>
                    <circle cx="444" cy="400" r="200" fill="#fff"/>
                    <circle cx="489" cy="400" r="160" fill="#E30A17"/>
                    <polygon points="632,400 682.4,364.6 663.1,423.5 722.5,404.2 672.1,368.8" fill="#fff" transform="rotate(-30 635 400) translate(65 0)"/>
                </svg>
            )}
          </button>
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
        <Link href="https://github.com/burakbehlull" className="hover:text-black transition-colors">
          <Github className="w-5 h-5" />
        </Link>
        <Link href="https://x.com/burakbehlull" className="hover:text-black transition-colors">
          <Twitter className="w-5 h-5" />
        </Link>
        <Link href="#" className="hover:text-black transition-colors">
          <Linkedin className="w-5 h-5" />
        </Link>
      </div>
    </footer>
  );
}
