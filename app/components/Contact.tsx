"use client";

import { useContext } from "react";
import { CONTACT } from "../constants";
import { motion } from "framer-motion";
import { FaGithub, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaLocationDot, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { MdEmail as EmailIcon } from "react-icons/md";
import CustomSection from "./custom/CustomSection";
import { ThemeContext } from "../context/ThemeContext";

const Contact = () => {
  const { darkMode } = useContext(ThemeContext);

  const infoItems = [
    {
      icon: <FaLocationDot className={`text-lg ${darkMode ? "text-purple-400" : "text-purple-600"}`} />,
      label: "Location",
      value: CONTACT.address,
      link: null,
      displayValue: CONTACT.address,
    },
    {
      icon: <EmailIcon className={`text-lg ${darkMode ? "text-pink-400" : "text-pink-600"}`} />,
      label: "Email",
      value: CONTACT.email,
      link: "mailto:" + CONTACT.email,
      displayValue: CONTACT.email,
    },
    {
      icon: <FaFacebook className={`text-lg ${darkMode ? "text-blue-500" : "text-blue-600"}`} />,
      label: "Facebook",
      value: CONTACT.facebook,
      link: CONTACT.facebook,
      displayValue: "fb/tarikurrahman08",
    },
    {
      icon: <FaInstagram className={`text-lg ${darkMode ? "text-orange-400" : "text-orange-600"}`} />,
      label: "Instagram",
      value: CONTACT.instagram,
      link: CONTACT.instagram,
      displayValue: "ig/tarikurrahman08",
    },
    {
      icon: <FaTiktok className={`text-lg ${darkMode ? "text-teal-400" : "text-teal-600"}`} />,
      label: "TikTok",
      value: CONTACT.tiktok,
      link: CONTACT.tiktok,
      displayValue: "@tarikurrahman.bd",
    },
    {
      icon: <FaGithub className={`text-lg ${darkMode ? "text-slate-300" : "text-slate-700"}`} />,
      label: "GitHub",
      value: CONTACT.github,
      link: CONTACT.github,
      displayValue: "github/tarikurrahmanbd",
    },
  ];

  return (
    <CustomSection className="relative z-10 py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Title & Subtitle with forced explicit high-contrast inline styles */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 transition-colors duration-300"
            style={{ color: darkMode ? "#ffffff" : "#000000" }}
          >
            Get in Touch
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="h-0.5 w-36 mx-auto rounded-full transition-colors duration-300"
            style={{ backgroundColor: darkMode ? "#a855f7" : "#9333ea" }}
          />
          <p 
            className="mt-5 text-sm sm:text-base max-w-md mx-auto font-medium transition-colors duration-300"
            style={{ color: darkMode ? "#94a3b8" : "#1e293b" }}
          >
            Let&apos;s collaborate on creative designs, technical robotics projects, or upcoming digital innovations.
          </p>
        </div>

        {/* 🌟 3-Column JavaScript Dynamic High-Contrast Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {infoItems.map((item, index) => {
            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center justify-between p-5 rounded-xl border shadow-md hover:border-purple-500 transition-all duration-300 group cursor-pointer"
                style={{
                  backgroundColor: darkMode ? "#0f172a" : "#ffffff",
                  borderColor: darkMode ? "#1e293b" : "#cbd5e1",
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Inner Icon Box */}
                  <div 
                    className="p-3 rounded-lg border transition-colors duration-300"
                    style={{
                      backgroundColor: darkMode ? "#020617" : "#f1f5f9",
                      borderColor: darkMode ? "#1e293b" : "#e2e8f0"
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p 
                      className="text-[10px] font-bold uppercase tracking-widest transition-colors duration-300"
                      style={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                    >
                      {item.label}
                    </p>
                    <p 
                      className="text-sm font-bold mt-1 break-all transition-colors duration-300"
                      style={{ color: darkMode ? "#ffffff" : "#000000" }}
                    >
                      {item.displayValue}
                    </p>
                  </div>
                </div>
                <FaArrowUpRightFromSquare 
                  className="w-3.5 h-3.5 transition-colors duration-200 group-hover:text-purple-500" 
                  style={{ color: darkMode ? "#94a3b8" : "#64748b" }}
                />
              </motion.div>
            );

            return item.link ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer" key={index} className="block w-full no-underline">
                {CardContent}
              </a>
            ) : (
              <div key={index} className="w-full">{CardContent}</div>
            );
          })}
        </div>
      </div>
    </CustomSection>
  );
};

export default Contact;