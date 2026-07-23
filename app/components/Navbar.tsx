"use client";

import { useContext, useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSun, FiMoon, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

const sectionLinks = [
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Awards", href: "/#awards" },
  { label: "Gallery", href: "/#gallery" }, // 🛠️ ফিক্স করা হয়েছে: research এর বদলে gallery দেওয়া হলো
  { label: "Contact", href: "/#contact" },
];

const projectLinks = [
  { label: "PHOENIX-F1", href: "/projects/PHOENIX-F1", desc: "Advanced robotics intelligence platform" },
  { label: "PHANTOM-X", href: "/projects/PHANTOM-X", desc: "Autonomous tactical platform" },
];

const Navbar = () => {
  const { darkMode, toggleMode } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🛠️ ফিক্স করা হয়েছে: রুট পরিবর্তন হলে মেনু ও ড্রপডাউন বন্ধ করার হ্যান্ডলার
  useEffect(() => {
    const handlePathChange = () => {
      setMenuOpen(false);
      setProjectsDropdownOpen(false);
    };
    handlePathChange();
  }, [pathname]);

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ হওয়া
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProjectsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // স্ক্রল হলে ব্যাকগ্রাউন্ড টগল
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // মোবাইল মেনু খোলা থাকলে বডি স্ক্রল বন্ধ করা
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = useCallback(
    (href: string) => {
      setMenuOpen(false);

      if (href.startsWith("/#")) {
        const id = href.replace("/#", "");
        if (pathname === "/") {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    },
    [pathname]
  );

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${
          scrolled
            ? "py-3 bg-white/70 dark:bg-[#111e36]/75 backdrop-blur-md shadow-sm border-slate-200/50 dark:border-slate-800/40"
            : "py-6 bg-transparent border-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-lg font-bold tracking-tight bg-linear-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
          >
            Tarikur Rahman
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-slate-100/60 dark:bg-slate-800/40 p-1.5 rounded-full border border-slate-200/40 dark:border-slate-700/30">
            {sectionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-xs font-medium px-4 py-2 rounded-full transition-all text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-900 shadow-none hover:shadow-sm"
              >
                {link.label}
              </Link>
            ))}

            <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-2" />

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setProjectsDropdownOpen((prev) => !prev);
                }}
                className={`text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1 transition-all ${
                  projectsDropdownOpen || projectLinks.some((l) => pathname === l.href)
                    ? "text-purple-600 dark:text-white bg-white dark:bg-slate-900 shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-900"
                }`}
              >
                Projects
                <FiChevronDown
                  className={`w-3 h-3 transition-transform duration-300 ${
                    projectsDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {projectsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111e36] p-2 shadow-xl backdrop-blur-xl z-50"
                  >
                    {projectLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setProjectsDropdownOpen(false)}
                        className={`flex flex-col gap-0.5 p-3 rounded-lg text-left transition-colors ${
                          pathname === link.href
                            ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200"
                        }`}
                      >
                        <span className="text-xs font-semibold">{link.label}</span>
                        <span className="text-[10px] text-slate-400 font-light">{link.desc}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMode}
              className="p-2.5 rounded-full border border-slate-200/50 dark:border-slate-800/40 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2.5 rounded-full border border-slate-200/50 dark:border-slate-800/40 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <FiX className="w-4 h-4" /> : <FiMenu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-60 md:hidden bg-white dark:bg-[#111e36] flex flex-col p-6"
          >
            <div className="flex items-center justify-between w-full mb-12">
              <span className="text-md font-bold bg-linear-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-5 text-left pl-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Sections
              </p>
              {sectionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl font-bold text-slate-800 dark:text-slate-100 hover:text-purple-500 active:scale-[0.98] origin-left transition-all"
                >
                  {link.label}
                </Link>
              ))}

              <div className="w-full h-px bg-slate-200 dark:bg-slate-800 my-4" />

              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Projects
              </p>
              {projectLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-xl font-semibold transition-colors ${
                    pathname === link.href
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-slate-700 dark:text-slate-300 hover:text-purple-500"
                  }`}
                >
                  {link.label}
                  <span className="block text-xs font-light text-slate-400 dark:text-slate-500 mt-0.5">
                    {link.desc}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;