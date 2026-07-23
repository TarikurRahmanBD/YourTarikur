"use client";

import CustomSection from "./custom/CustomSection";
import DynamicCarousel from "./custom/DynamicCarousel";
import StickyAvatar from "./custom/StickyAvatar";
import { motion, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface ExperienceItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  image: string[];
}

const WhiteDot = ({
  position,
  visible,
}: {
  position?: string;
  visible?: boolean;
}) => {
  const classNames =
    position === "top"
      ? "lg:-left-17 xl:-left-18"
      : "-mt-5 lg:-ml-1 lg:left-1/2";

  return (
    <div
      className={`py-1 absolute z-20 left-0 ${classNames}`}
      style={{ backgroundColor: "var(--bg-color-light)" }}
    >
      <div
        className={`z-20 -ml-px h-3 w-3 origin-center transform rounded-full border-2 transition-transform  ${
          visible
            ? "ring-2 bg-indigo-500 ring-indigo-500"
            : "bg-white"
        }`}
        style={{ borderColor: "var(--bg-color-light)" }}
      ></div>
    </div>
  );
};

const GridLine = () => {
  return (
    <div className="relative row-span-4 lg:absolute lg:h-full lg:w-full ">
      <div
        className="z-10 w-0.5 from-gray-100 absolute left-1/2 h-full"
        style={{
          backgroundImage:
            "linear-gradient(180deg, transparent, transparent 50%, var(--tw-gradient-from) 50%, var(--tw-gradient-from) 100%)",
          backgroundSize: "2px 8px",
          backgroundRepeat: "repeat-y",
        }}
      ></div>
    </div>
  );
};

const GridLineGradiant = ({ position }: { position: string }) => {
  let background = "";
  if (position === "top") {
    background =
      "linear-gradient(to bottom, var(--bg-color-light), transparent)";
  } else if (position === "bottom") {
    background = "linear-gradient(to top, var(--bg-color-light), transparent)";
  }

  return (
    <>
      <div className="h-15"></div>
      <div
        className="z-10 w-0.5 from-gray-100 absolute left-1 -mt-15 h-15 lg:left-1/2"
        style={{
          backgroundImage:
            "linear-gradient(180deg, transparent, transparent 50%, var(--tw-gradient-from) 50%, var(--tw-gradient-from) 100%)",
          backgroundSize: "2px 8px",
          backgroundRepeat: "repeat-y",
        }}
      ></div>
      <div
        className="absolute left-0 z-20 -mt-15 h-15 w-2 lg:left-1/2 lg:-ml-px"
        style={{
          background: background,
        }}
      ></div>
    </>
  );
};

const ListItemRow = ({
  listItem,
  index,
  listItemScrollIndex,
  setListItemScrollIndex,
}: {
  listItem: ExperienceItem;
  index: number;
  listItemScrollIndex: number;
  setListItemScrollIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (
        value < 0.5 &&
        listItemScrollIndex === index &&
        listItemScrollIndex !== 0
      ) {
        setListItemScrollIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : 0
        );
      } else if (value > 0.5 && listItemScrollIndex < index) {
        setListItemScrollIndex(index);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, listItemScrollIndex, index, setListItemScrollIndex]);

  const opacity = listItemScrollIndex === index ? 1 : 0.5;

  return (
    <motion.div ref={ref} className="lg:pb-20 lg:relative pt-1">
      <WhiteDot position="top" visible={opacity === 1} />
      <div style={{ opacity }} className="transition-opacity duration-300">
        {listItem.year && <p className="mb-4 text-sm text-slate-400">{listItem.year}</p>}
        <h3 className="-mt-2.5 mb-2 font-semibold text-3xl text-slate-900 dark:text-white">
          {listItem.title}
        </h3>
        <h4 className="mb-2 font-medium text-xl text-purple-600 dark:text-purple-400">{listItem.subtitle}</h4>
        
        {/* মডিফাইড ডেসক্রিপশন রেন্ডারিং মেকানিজম */}
        <div className="text-slate-600 dark:text-slate-300 space-y-1">
          {listItem.description.split("\n").map((line, lineIndex) => (
            <p key={lineIndex} className="leading-relaxed">
              {line}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {listItem.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="rounded bg-slate-100 dark:bg-neutral-900 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-purple-300 border border-slate-200/40 dark:border-transparent"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-6 mb-10 w-full overflow-hidden lg:hidden">
          <DynamicCarousel images={listItem.image} />
        </div>
      </div>
    </motion.div>
  );
};

const Experience = ({
  SectionTopic,
  title,
}: {
  SectionTopic: ExperienceItem[];
  title: string;
}) => {
  const [listItemScrollIndex, setListItemScrollIndex] = useState(0);

  return (
    <CustomSection
      className="min-h-screen border-t border-t-white border-b border-b-white"
      style={{ backgroundColor: "var(--bg-color-light)" }}
    >
      <h2 className="py-20 text-center text-4xl font-bold tracking-tight">{title}</h2>
      <div className="relative">
        <GridLineGradiant position="top" />
      </div>
      <div className="relative">
        <div className="absolute left-5 -ml-2 h-full w-4 sm:left-9 lg:left-1/2 lg:block">
          <StickyAvatar />
        </div>
        <div className="grid grid-cols-[8px_1fr] gap-x-5 lg:grid-cols-1">
          <GridLine />
          <div className="flex flex-col gap-6 lg:flex-row-reverse lg:gap-32 min-w-0 w-full">
            <div className="w-full min-w-0 lg:max-w-135 lg:flex-1">
              {SectionTopic.map((listItem, index) => (
                <ListItemRow
                  key={index}
                  listItem={listItem}
                  index={index}
                  listItemScrollIndex={listItemScrollIndex}
                  setListItemScrollIndex={setListItemScrollIndex}
                />
              ))}
            </div>
            <div className="hidden lg:visible lg:max-w-135 lg:flex lg:flex-1 lg:items-start lg:justify-end ">
              <motion.div
                initial={{ scale: 0.98, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                key={listItemScrollIndex}
                className="sticky"
                style={{ top: "calc(23vh)" }}
              >
                {/* অ্যারে ক্র্যাশ প্রটেকশন সহ ক্যারোসেল মাউন্ট */}
                <DynamicCarousel
                  images={SectionTopic[listItemScrollIndex]?.image || []}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <WhiteDot />
        <GridLineGradiant position="bottom" />
      </div>
    </CustomSection>
  );
};

export default Experience;