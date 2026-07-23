"use client";

import React, { useRef, useContext, useState } from "react";
import Image from "next/image";
import CustomSection from "./custom/CustomSection";
import { SKILLS } from "../constants/index";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

const SkillCard = ({
  title,
  subtitle,
  icons,
  className = "",
  isTouched,
  onTouch,
}: {
  title: string;
  subtitle: string;
  icons: { title: string; icon: string }[];
  className?: string;
  isTouched: boolean;
  onTouch: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useContext(ThemeContext);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  // Apply active bg on mobile tap
  const touchStyle: React.CSSProperties =
    isTouched && darkMode ? { backgroundColor: "#151127" } : {};

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onTouch}
      className={`group/card relative overflow-hidden transition-colors duration-300 ${darkMode ? "hover:bg-[#151127]" : ""} ${className} h-fit border border-slate-500 rounded-xl backdrop-blur-sm w-full lg:flex-1 max-w-lg p-4`}
      style={touchStyle}
    >
      <div
        className={`pointer-events-none absolute -inset-px transition duration-300 ${isTouched ? "opacity-100" : "opacity-0"} group-hover/card:opacity-100`}
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(59, 130, 246, 0.15)"}, transparent 50%)`,
        }}
      />
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        {subtitle.split("\n").map((line, index) => (
          <p key={index} className="mb-1">
            {line}
          </p>
        ))}
        <div className="flex flex-wrap gap-2 mt-6">
          {icons.map((icon, index) => (
            <div key={index} className="relative group">
              <Image
                src={icon.icon}
                alt={icon.title}
                width={40}
                height={40}
                quality={80}
                className="w-10 h-10 object-contain"
                loading="lazy"
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {icon.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const [touchedCard, setTouchedCard] = useState<number | null>(null);

  const handleTouch = (index: number) => {
    setTouchedCard(touchedCard === index ? null : index);
  };

  return (
    <CustomSection>
      <h2 className="mb-2 text-center font-semibold text-3xl">WHAT I DO</h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="mb-20 h-[2px] bg-purple-500 w-28 mx-auto"
      ></motion.div>
      <div className="flex justify-center flex-wrap gap-3">
        {SKILLS.map((skill, index) => (
          <SkillCard
            key={index}
            title={skill.title}
            subtitle={skill.subtitle}
            icons={skill.icons}
            isTouched={touchedCard === index}
            onTouch={() => handleTouch(index)}
            className={`${
              index === 1 ? "lg:mt-4" : index === 2 ? "lg:mt-8" : ""
            }`}
          />
        ))}
      </div>
    </CustomSection>
  );
};

export default Skills;
