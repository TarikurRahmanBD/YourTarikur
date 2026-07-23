"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaExpandAlt, FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import CustomSection from "./custom/CustomSection";
import { ThemeContext } from "../context/ThemeContext";

const galleryImages = [
  {
    id: 1,
    title: "World Invention Competition & Exhibition 2026 Showcase",
    description: "Team DEMON71 showcased their project at Northern University Bangladesh.",
    tag: "Robotics",
    src: "/assets/projects/wice_group.jpg",
  },
  {
    id: 2,
    title: "National Round WICE 2026 Gold Medal",
    description: "Team DEMON71 was awarded the Gold Medal in the national round of WICE 2026.",
    tag: "Robotics",
    src: "/assets/projects/wice.jpg",
  },
  {
    id: 3,
    title: "DEMON-71 Rover Showcase with Inventor",
    description: "Demonstrating the tactical defense rover DEMON-71 at the National Science and Technology Complex.",
    tag: "Robotics",
    src: "/assets/projects/solopik.jpg",
  },
  {
    id: 4,
    title: "47th National Science & Tech Fair - Grand Finale",
    description: "Team DEMON71 secured 5th Place at the Grand Finale of the 47th National Science & Technology Fair (National Level).",
    tag: "National Award",
    src: "/assets/projects/national.jpg",
  },
  {
    id: 5,
    title: "Sylhet Division Event Evaluation",
    description: "Evaluation session and judges photo with Team DEMON71 at the Sylhet Division event.",
    tag: "Robotics",
    src: "/assets/projects/sylhet.jpg",
  },
  {
    id: 6,
    title: "Sylhet Division Level Champions",
    description: "Triumphant 1st Place moment achieved by Team DEMON71 at the Sylhet Division level.",
    tag: "Robotics",
    src: "/assets/projects/sylhet-2.jpg",
  },
  {
    id: 7,
    title: "Official District Reception",
    description: "Official reception and honor for Team DEMON71 from the District Administration after the Sylhet victory.",
    tag: "Robotics",
    src: "/assets/projects/sylhet-3.jpg",
  },
  {
    id: 8,
    title: "Field Testing of DEMON-71 Tactical Rover",
    description: "Team DEMON71 testing the computational algorithms and remote control hardware of the DEMON-71 defense rover outdoors.",
    tag: "Robotics",
    src: "/assets/projects/demon71_field_test.jpg",
  },
  {
    id: 9,
    title: "Mentoring & Science Club Presentation",
    description: "Conducting an interactive workshop on IoT, Robotics, and Innovation with students under Udvaboni Biggan Club.",
    tag: "Mentorship",
    src: "/assets/projects/presentation_session.jpg",
  },
];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { darkMode } = useContext(ThemeContext);

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const selectedImage = selectedIndex !== null ? galleryImages[selectedIndex] : null;

  return (
    <CustomSection
      className="relative z-10 py-24 overflow-hidden w-full transition-colors duration-300"
      style={{
        backgroundColor: darkMode ? "#111e36" : "#ffffff",
      }}
    >
      {/* Background Glow */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-175 h-175 blur-[160px] rounded-full pointer-events-none transition-colors duration-300 ${
          darkMode ? "bg-indigo-600/10" : "bg-indigo-500/5"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Block */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 transition-colors duration-300"
            style={{ color: darkMode ? "#ffffff" : "#0f172a" }}
          >
            Gallery
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-16 h-1 bg-purple-500 mx-auto mb-6 rounded-full origin-center"
          />
        </div>

        {/* Fluid Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-full space-y-4">
          {galleryImages.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
              }}
              onClick={() => setSelectedIndex(index)}
              className="break-inside-avoid group relative overflow-hidden cursor-pointer w-full rounded-xl border transition-all duration-300 hover:shadow-2xl hover:border-purple-500/50"
              style={{
                borderColor: darkMode ? "#1e293b" : "#e2e8f0",
                backgroundColor: darkMode ? "#1e293b" : "#f8fafc",
              }}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={800}
                height={600}
                className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Glassmorphic Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 backdrop-blur-[2px]">
                <div className="flex justify-end">
                  <span className="text-[10px] font-semibold tracking-wider text-white uppercase bg-purple-600/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                    {item.tag}
                  </span>
                </div>
                <div className="flex items-end justify-between text-white gap-2">
                  <div>
                    <p className="text-xs font-semibold line-clamp-1">{item.title}</p>
                    <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5 opacity-90">
                      {item.description}
                    </p>
                  </div>
                  <FaExpandAlt className="w-3.5 h-3.5 opacity-80 shrink-0 mb-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </motion.button>

            {/* Prev Arrow */}
            <motion.button
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="absolute left-6 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden sm:block z-50"
            >
              <FaArrowLeft className="w-5 h-5" />
            </motion.button>

            {/* Next Arrow */}
            <motion.button
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="absolute right-6 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden sm:block z-50"
            >
              <FaArrowRight className="w-5 h-5" />
            </motion.button>

            {/* Lightbox Content Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage.id}
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: -10 }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col"
              >
                <div className="flex-1 overflow-hidden flex items-center justify-center bg-black/50 p-2">
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-[65vh] object-contain mx-auto rounded-lg"
                  />
                </div>

                {/* Description and Title in Lightbox */}
                <div className="p-6 bg-slate-950/95 border-t border-slate-800/80 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-purple-400 uppercase tracking-widest bg-purple-950/60 border border-purple-800/50 px-2.5 py-0.5 rounded-full">
                      {selectedImage.tag}
                    </span>
                    <span className="text-xs text-slate-400">
                      {selectedIndex !== null ? selectedIndex + 1 : 0} / {galleryImages.length}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                    {selectedImage.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </CustomSection>
  );
};

export default Gallery;