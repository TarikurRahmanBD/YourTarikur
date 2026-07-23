"use client";

import { useState, useContext, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ThemeContext } from "../../context/ThemeContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface GalleryItem {
  label: string;
  src: string;
  hidden?: boolean;
  /** Custom grid span classes. If not provided, uses built-in bento layout. */
  spanClass?: string;
}

/**
 * Default bento span classes for up to 6 items.
 * Index-based: first item is the hero (large), rest fill around it.
 * Override per-item via `spanClass` on each GalleryItem.
 */
const DEFAULT_SPANS = [
  "col-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
  "col-span-1 md:col-span-2 lg:col-span-2",
  "col-span-1 md:col-span-2 lg:col-span-2",
  "col-span-2 md:col-span-4 lg:col-span-2 lg:row-span-2",
  "col-span-1 md:col-span-2 lg:col-span-2",
  "col-span-1 md:col-span-2 lg:col-span-2",
];

const BentoGallery = ({
  items,
  gridClassName,
}: {
  items: GalleryItem[];
  /** Override the default grid classes if you need a different column layout. */
  gridClassName?: string;
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const { darkMode } = useContext(ThemeContext);

  const visibleItems = items.filter((item) => !item.hidden);
  const isOpen = lightboxIndex !== null;

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  // Sync swiper to the clicked image index
  useEffect(() => {
    if (isOpen && swiperInstance && lightboxIndex !== null) {
      swiperInstance.slideTo(lightboxIndex, 0);
    }
  }, [isOpen, swiperInstance, lightboxIndex]);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setLightboxIndex(swiper.activeIndex);
  }, []);

  return (
    <>
      <div
        className={
          gridClassName ||
          "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[minmax(180px,auto)] gap-4"
        }
      >
        {visibleItems.map((item, idx) => {
          const spanClass = item.spanClass || DEFAULT_SPANS[idx] || "";
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`group relative rounded-xl border border-slate-500/30 overflow-hidden cursor-pointer ${spanClass} ${
                darkMode ? "bg-[#151127]/40" : "bg-blue-50/30"
              }`}
              onClick={() => setLightboxIndex(idx)}
            >
              <div className="relative w-full min-h-[180px] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  quality={80}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-4 py-3">
                <p className="text-sm font-medium text-white/90">
                  {item.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox carousel modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-5xl w-[90vw] max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <h3 className="text-lg font-semibold text-white">
                {visibleItems[lightboxIndex]?.label}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-sm text-white/50">
                  {lightboxIndex + 1} / {visibleItems.length}
                </span>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-xl"
                >
                  &times;
                </button>
              </div>
            </div>

            {/* Swiper carousel */}
            <style jsx global>{`
              .lightbox-swiper .swiper-button-next,
              .lightbox-swiper .swiper-button-prev {
                color: ${darkMode ? "rgb(139, 92, 246)" : "rgb(59, 130, 246)"};
                width: 28px;
                height: 28px;
                background: transparent;
                border: none;
                border-radius: 50%;
                transition: all 0.2s;
              }
              .lightbox-swiper .swiper-button-next::after,
              .lightbox-swiper .swiper-button-prev::after {
                font-size: 9px;
                font-weight: 600;
              }
              .lightbox-swiper .swiper-button-next:hover,
              .lightbox-swiper .swiper-button-prev:hover {
                opacity: 0.7;
              }
              .lightbox-swiper .swiper-wrapper {
                align-items: center;
              }
              .lightbox-swiper .swiper-slide {
                display: flex;
                align-items: center;
                justify-content: center;
                height: auto;
              }
              .lightbox-swiper .swiper-pagination {
                position: relative;
                margin-top: 12px;
                display: flex;
                justify-content: center;
                gap: 6px;
              }
              .lightbox-swiper .swiper-pagination-bullet {
                width: 6px;
                height: 6px;
                background-color: rgba(255, 255, 255, 0.4);
                border-radius: 4px;
                transition: all 0.3s ease;
                opacity: 1;
              }
              .lightbox-swiper .swiper-pagination-bullet-active {
                width: 12px;
                height: 6px;
                background-color: white;
              }
            `}</style>
            <Swiper
              modules={[Navigation, Pagination, Keyboard]}
              navigation
              pagination={{
                clickable: true,
                renderBullet: (index: number, className: string) => {
                  return `<div class="${className}"></div>`;
                },
              }}
              keyboard={{ enabled: true }}
              initialSlide={lightboxIndex}
              onSwiper={setSwiperInstance}
              onSlideChange={handleSlideChange}
              className="w-full lightbox-swiper"
            >
              {visibleItems.map((item, idx) => (
                <SwiperSlide key={idx}>
                <div className="relative w-full h-[75vh] overflow-hidden rounded-lg">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    quality={85}
                    className="object-contain"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
              </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default BentoGallery;
