"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  useRef,
  createRef,
} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { ThemeContext } from "../context/ThemeContext";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FaShieldAlt, FaRobot, FaSatellite } from "react-icons/fa";
import CustomSection from "../components/custom/CustomSection";
import Contact from "../components/Contact";

type IconId = "FaRobot" | "FaSatellite" | "FaShieldAlt";

interface StackItem {
  id: number;
  title: string;
  description: string;
  iconId: IconId;
}

interface StepItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface AboutMeSection {
  title: string;
  statement: string;
  description: string;
  images: string[];
}

interface PhantomXData {
  title: string;
  executiveSummary: string;
  problem: string[];
  coreConcept: string;
  steps: StepItem[];
  stack: StackItem[];
  aboutMe: AboutMeSection;
}

// Dynamic Configuration for PHANTOM-X Tactical Rover
const PHANTOM_X: PhantomXData = {
  title: "PHANTOM-X: Next-Gen Tactical Defense Rover",
  executiveSummary:
    "Designed to execute high-risk reconnaissance, subterranean landmine detection, and remote bomb disposal to protect human lives. Built around the philosophy that human life is more valuable than any machine.",
  problem: [
    "Absence of indigenous high-tech robotics tailored for modern tactical intelligence operations during national defense exhibitions like 'Onirban'.",
    "Tragic casualties from bomb blasts, landmine explosions, and hostile explosive devices.",
    "Persistent threat to civilian lives from hidden border forces landmines and abandoned explosive hazards.",
  ],
  coreConcept:
    "Driven by heavy-duty 4WD off-road capabilities, high-torque 2-DOF precision arm, dual night-vision/thermal imaging, and global telemetry networks to remove human exposure from lethal environments.",
  steps: [
    {
      id: 1,
      title: "Tactical Reconnaissance & Comms",
      description: "Dual night-vision & thermal imaging with global telemetry network for secure remote control.",
      image: "/assets/projects/phantom-x/step1.jpg",
    },
    {
      id: 2,
      title: "Subterranean Threat & EOD Neutralization",
      description: "Military-grade sensor payload to map landmines paired with a 40KG base / 35KG elbow servo robotic arm.",
      image: "/assets/projects/phantom-x/step2.jpg",
    },
    {
      id: 3,
      title: "Electronic Warfare & Self-Neutralization",
      description: "80-100m tactical jamming module alongside autonomous self-destruction failsafes.",
      image: "/assets/projects/phantom-x/step3.jpg",
    },
  ],
  stack: [
    {
      id: 1,
      title: "Robotic Arm & Hardware",
      description: "Heavy-duty 4WD chassis, hybrid aluminum metal sheet structure, 40KG & 35KG torque servos.",
      iconId: "FaRobot",
    },
    {
      id: 2,
      title: "Computing & Sensors",
      description: "Raspberry Pi 4 (8GB RAM) brain, thermal/night-vision optic array, subterranean sensors.",
      iconId: "FaSatellite",
    },
    {
      id: 3,
      title: "Warfare & Power",
      description: "12V 5200mAh battery pack, 80-100m jammer module, autonomous counter-charge payload.",
      iconId: "FaShieldAlt",
    },
  ],
  aboutMe: {
    title: "System Architecture & Development",
    statement: "“Even if a 4 to 5 lakh BDT unit is completely destroyed, saving a single life represents total success.”",
    description:
      "Engineered by Tarikur Rahman as System Architect & Developer. Research & planning conducted from September to March, followed by full execution from April to May. Designed for complete precision across AI surveillance, EW jamming, and EOD operations.",
    images: [
      "/assets/projects/phantom-x/dev1.jpg",
      "/assets/projects/phantom-x/dev2.jpg",
      "/assets/projects/phantom-x/dev3.jpg",
    ],
  },
};

const iconMap: Record<IconId, React.ReactNode> = {
  FaRobot: <FaRobot />,
  FaSatellite: <FaSatellite />,
  FaShieldAlt: <FaShieldAlt />,
};

interface StackItem {
  id: number;
  title: string;
  description: string;
  iconId: IconId;
}

interface MarketCardProps {
  item: StackItem;
  darkMode: boolean;
  className?: string;
}

interface ChatBubbleProps {
  title: string;
  description: string;
  visible: boolean;
  active: boolean;
  isFirst: boolean;
  isLast: boolean;
  isSingle: boolean;
  darkMode: boolean;
  delay?: number;
}

interface ScrollImageProps {
  src: string;
  step: number;
  activeStep: number;
  imageRef: React.RefObject<HTMLDivElement | null>;
}

const PhantomX = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { darkMode } = useContext(ThemeContext);
  const stepRefs = useMemo(
    () => PHANTOM_X.steps.map(() => createRef<HTMLDivElement>()),
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!stepRefs || stepRefs.length === 0) return;
      let currentStep = 0;

      PHANTOM_X.steps.forEach((step, index) => {
        const el = stepRefs[index].current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const triggerPoint =
            index === 0 ? window.innerHeight * 0.6 : window.innerHeight * 0.5;

          if (rect.top <= triggerPoint) {
            currentStep = step.id;
          }
        }
      });

      setActiveStep((prev) => (prev !== currentStep ? currentStep : prev));
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    const timeoutId = setTimeout(handleScroll, 10);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [stepRefs]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="w-full relative z-10 pt-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col"
      >
        {/* Page Title */}
        <div className="container mx-auto px-8 xl:max-w-screen-xl pt-12 mb-10">
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-emerald-400 to-cyan-600 bg-clip-text text-transparent pb-2 mb-20 tracking-wide uppercase"
          >
            {PHANTOM_X.title}
          </motion.h1>
        </div>

        {/* Section: Executive Summary */}
        <div className="container mx-auto px-8 xl:max-w-screen-xl mb-24 lg:mb-40 flex flex-col">
          <motion.h2
            variants={itemVariants}
            className="mb-2 text-center font-semibold text-3xl"
          >
            Executive Summary
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mb-10 h-[2px] bg-emerald-500 w-28 mx-auto"
          ></motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-justify leading-relaxed opacity-90"
          >
            {PHANTOM_X.executiveSummary}
          </motion.p>
        </div>

        {/* Section: The Problem */}
        <CustomSection
          className="border-y border-y-slate-500/30 py-10 mb-10 lg:mb-20"
          style={{ backgroundColor: "var(--bg-color-light)" }}
        >
          <div className="container mx-auto xl:max-w-screen-xl flex justify-center">
            <motion.div
              variants={itemVariants}
              className="flex flex-col max-w-4xl w-full"
            >
              <h2 className="mt-20 mb-2 text-center font-semibold text-3xl">
                The Problem & Motivation
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="mb-10 h-[2px] bg-cyan-500 w-28 mx-auto"
              ></motion.div>
              <ul className="list-disc pl-5 space-y-4 opacity-90 text-lg leading-relaxed mt-4">
                {PHANTOM_X.problem.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </CustomSection>

        {/* Section: Operational Mechanics */}
        <div className="container mx-auto px-8 xl:max-w-screen-xl lg:mb-20">
          <section className="flex flex-col">
            <h2 className="mt-20 mb-2 text-center font-semibold text-3xl">
              Technical Overview & Architecture
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-10 h-[2px] bg-emerald-500 w-28 mx-auto"
            ></motion.div>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-center leading-relaxed opacity-90 max-w-4xl mx-auto mb-16"
            >
              {PHANTOM_X.coreConcept}
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
              {/* Left Column: Sticky Container with Avatar & Bubbles */}
              <div className="relative order-2 lg:order-1 w-full h-full">
                <div className="lg:sticky lg:top-[70vh] lg:-translate-y-1/2 h-fit flex items-end w-full relative pt-4 pb-8">
                  <div className="flex-shrink-0 relative z-20">
                    <motion.div
                      className="relative w-10 h-10 xl:w-16 xl:h-16 rounded-full overflow-hidden border-4 border-emerald-500 shadow-2xl relative z-10 hidden lg:block"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: activeStep >= 1 ? 1 : 0,
                        opacity: activeStep >= 1 ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src="/assets/tarikur.png"
                        alt="Tarikur Rahman"
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </div>

                  <div className="w-full max-w-md hidden lg:flex flex-col justify-end lg:absolute lg:bottom-8 lg:left-12 xl:left-20 z-10">
                    {PHANTOM_X.steps.map((step) => {
                      const isVisible = activeStep >= step.id;
                      const isFirst = step.id === 1;
                      const isLast = step.id === activeStep;
                      const isSingle = activeStep === 1;

                      return (
                        <ChatBubble
                          key={step.id}
                          title={step.title}
                          description={step.description}
                          visible={isVisible}
                          active={activeStep === step.id}
                          isFirst={isFirst}
                          isLast={isLast}
                          isSingle={isSingle}
                          darkMode={darkMode}
                          delay={isFirst ? 0.1 : 0}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Scrollable Images */}
              <div className="flex flex-col gap-20 order-1 lg:order-2 w-full">
                {PHANTOM_X.steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col gap-6">
                    <ScrollImage
                      src={step.image}
                      step={step.id}
                      activeStep={activeStep}
                      imageRef={stepRefs[index]}
                    />
                    <div
                      className={`lg:hidden p-5 rounded-2xl border border-slate-500 backdrop-blur-sm transition-colors duration-500 ${
                        darkMode
                          ? "bg-[#0b1329] shadow-[0_0_20px_rgba(16,185,129,0.1)] text-gray-50"
                          : "bg-emerald-50/50 shadow-lg text-gray-800"
                      }`}
                    >
                      <p className="text-sm md:text-base opacity-90 whitespace-pre-line">
                        <strong>{step.title}</strong>
                        <br />
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Section: Core Stack */}
        <CustomSection className="py-10 lg:mb-20">
          <div className="container mx-auto xl:max-w-screen-xl flex justify-center">
            <motion.div
              variants={itemVariants}
              className="flex flex-col max-w-5xl w-full"
            >
              <h2 className="mt-20 mb-2 text-center font-semibold text-3xl">
                Core Stack & Hardware
              </h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="mb-10 h-[2px] bg-emerald-500 w-28 mx-auto"
              ></motion.div>

              <div className="flex justify-center flex-wrap gap-6 mt-4">
                {PHANTOM_X.stack.map((item, index) => (
                  <MarketCard
                    key={item.id}
                    item={item}
                    darkMode={darkMode}
                    className={`${
                      index === 1 ? "lg:mt-4" : index === 2 ? "lg:mt-8" : ""
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </CustomSection>

        {/* Section: Development Info */}
        <CustomSection
          className="border-t border-t-white border-b border-b-white pt-10 pb-10"
          style={{ backgroundColor: "var(--bg-color-light)" }}
        >
          <div className="container mx-auto xl:max-w-screen-xl">
            <h2 className="mt-20 mb-2 text-center font-semibold text-3xl">
              {PHANTOM_X.aboutMe.title}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="mb-10 h-[2px] bg-emerald-500 w-28 mx-auto"
            ></motion.div>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center mt-10">
              <p className="text-xl italic font-medium opacity-80 border-l-4 border-emerald-500 pl-4 py-2 my-2 order-1 lg:order-none">
                {PHANTOM_X.aboutMe.statement}
              </p>

              <motion.div
                variants={itemVariants}
                className="w-full order-2 lg:order-none lg:row-span-3"
              >
                <style jsx global>{`
                  .phantom-carousel .swiper-button-next,
                  .phantom-carousel .swiper-button-prev {
                    color: ${darkMode ? "rgb(16, 185, 129)" : "rgb(6, 182, 212)"};
                    width: 28px;
                    height: 28px;
                    background: transparent;
                    border: none;
                    transition: all 0.2s;
                  }
                  .phantom-carousel .swiper-button-next::after,
                  .phantom-carousel .swiper-button-prev::after {
                    font-size: 9px;
                    font-weight: 600;
                  }
                  .phantom-carousel .swiper-button-next:hover,
                  .phantom-carousel .swiper-button-prev:hover {
                    opacity: 0.7;
                  }
                  .phantom-carousel .swiper-pagination {
                    display: flex;
                    justify-content: center;
                    gap: 6px;
                  }
                  .phantom-carousel .swiper-pagination-bullet {
                    width: 6px;
                    height: 6px;
                    background-color: ${darkMode ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.3)"};
                    border-radius: 4px;
                    transition: all 0.3s ease;
                    opacity: 1;
                  }
                  .phantom-carousel .swiper-pagination-bullet-active {
                    width: 12px;
                    height: 6px;
                    background-color: ${darkMode ? "rgb(16, 185, 129)" : "rgb(6, 182, 212)"};
                  }
                `}</style>
                <Swiper
                  modules={[Pagination, Navigation, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation
                  pagination={{
                    clickable: true,
                    renderBullet: (index: number, className: string) => {
                      return `<div class="${className}"></div>`;
                    },
                  }}
                  autoplay={{ delay: 3000 }}
                  className="rounded-2xl shadow-2xl overflow-hidden phantom-carousel"
                >
                  {PHANTOM_X.aboutMe.images.map((img, index) => (
                    <SwiperSlide key={index}>
                    <div className="relative w-full h-100 overflow-hidden rounded-2xl">
                      <Image
                        src={img}
                        alt={`Development Phase ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 700px"
                      />
                    </div>
                  </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>

              <p className="text-lg leading-relaxed opacity-90 whitespace-pre-line order-3 lg:order-none">
                {PHANTOM_X.aboutMe.description}
              </p>

              <div className="order-4 lg:order-none">
                <a
                  href="https://github.com/yourtarikur"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className={`flex justify-center items-center py-2 px-8 transition-colors duration-300 rounded font-semibold w-fit mt-4 cursor-pointer z-50 pointer-events-auto ${
                      darkMode
                        ? "bg-emerald-500 text-black hover:bg-emerald-400"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    View Project Details
                  </button>
                </a>
              </div>
            </div>
          </div>
        </CustomSection>

        <Contact />
      </motion.div>
    </div>
  );
};

const MarketCard: React.FC<MarketCardProps> = ({
  item,
  darkMode,
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      className={`relative group/card w-full lg:flex-1 max-w-sm ${className}`}
    >
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl z-20 shadow-lg ring-4 ring-white/10 dark:ring-black/10 transition-transform duration-300 group-hover/card:scale-110">
        {iconMap[item.iconId]}
      </div>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`relative overflow-hidden transition-colors duration-300 h-fit border border-slate-500 rounded-xl backdrop-blur-sm p-8 ${
          darkMode ? "hover:bg-[#0b1329]" : ""
        }`}
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover/card:opacity-100"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), ${
              darkMode ? "rgba(16, 185, 129, 0.15)" : "rgba(6, 182, 212, 0.15)"
            }, transparent 50%)`,
          }}
        />

        <div className="relative z-10 pt-2">
          <strong className="text-lg block mb-1 text-emerald-500 dark:text-emerald-400">
            {item.title}
          </strong>
          <p className="text-md opacity-90 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const ChatBubble: React.FC<ChatBubbleProps> = ({
  title,
  description,
  visible,
  active,
  isFirst,
  isLast,
  isSingle,
  darkMode,
  delay = 0,
}) => {
  const cornerClass = isSingle
    ? "rounded-3xl"
    : isFirst
      ? "rounded-3xl rounded-bl-lg"
      : isLast
        ? "rounded-3xl rounded-tl-lg"
        : "rounded-3xl rounded-l-lg";

  return (
    <motion.div
      initial={false}
      style={{
        height: visible ? "auto" : 0,
        opacity: visible ? 1 : 0,
        overflow: visible ? "visible" : "hidden",
        transformOrigin: "bottom left",
      }}
      animate={{
        opacity: visible ? 1 : 0,
        height: visible ? "auto" : 0,
        scale: visible ? 1 : 0,
        overflow: visible ? "visible" : "hidden",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: visible ? delay : 0,
        height: { duration: 0.3, delay: visible ? delay : 0 },
        opacity: { duration: 0.2, delay: visible ? delay : 0 },
      }}
      className={`relative w-full ${visible ? "pt-2" : "m-0 border-0 p-0"}`}
    >
      <div
        className={`p-5 border border-slate-500 backdrop-blur-sm transition-all duration-500 ${cornerClass} ${
          darkMode
            ? "bg-[#0b1329] shadow-[0_0_20px_rgba(16,185,129,0.05)] text-gray-200"
            : "bg-emerald-50/50 shadow-lg text-gray-800"
        }`}
      >
        <p className="text-sm md:text-base opacity-90 whitespace-pre-line">
          <strong className={active ? "text-emerald-500" : ""}>{title}</strong>
          <br />
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const ScrollImage: React.FC<ScrollImageProps> = ({
  src,
  step,
  activeStep,
  imageRef,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      ref={imageRef}
      initial={
        isMobile ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.9 }
      }
      animate={
        isMobile
          ? { opacity: 1, scale: 1 }
          : {
              opacity: activeStep >= step ? 1 : 0.8,
              scale: activeStep >= step ? 1 : 0.9,
            }
      }
      transition={isMobile ? { duration: 0 } : { duration: 0.3 }}
      className="relative group w-full"
    >
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg">
        {step}
      </div>
      <div className="rounded-2xl overflow-hidden border-4 border-emerald-500/20 shadow-2xl bg-black/5 dark:bg-white/5 transition-all duration-500 group-hover:border-emerald-500/50">
        <Image
          src={src}
          alt={`Step ${step}`}
          width={1200}
          height={800}
          className="w-full h-auto object-contain"
          priority={false}
        />
      </div>
    </motion.div>
  );
};

export default PhantomX;