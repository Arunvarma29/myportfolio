"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import {
  TooltipContent,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import WorkSliderBtn from "@/components/WorkSliderBtn";

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects", {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch projects.");
        }

        setProjects(result.data);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          console.error("Fetch projects error:", fetchError);
          setError("Unable to load projects.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();
    return () => controller.abort();
  }, []);

  const project = projects[activeIndex] || projects[0];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        {loading ? (
          <p className="text-center">Loading projects...</p>
        ) : error ? (
          <p role="alert" className="text-center">
            {error}
          </p>
        ) : !project ? (
          <p className="text-center">No projects have been published yet.</p>
        ) : (
          <div className="flex flex-col xl:flex-row xl:gap-7.5">
            <div className="w-full xl:w-[50%] xl:h-115 flex flex-col px-2 xl:justify-between order-2 xl:order-0">
              <div className="flex flex-col gap-7.5 h-[50%]">
                <div className="text-8xl leading-none hover:text-accent font-extrabold text-transparent text-outline">
                  {String(activeIndex + 1).padStart(2, "0")} 
                </div>
                <h2 className="text-[42px] font-bold leading-none dark:text-white capitalize">
                  {project.title}
                </h2>
                <p className="text-gray-700 dark:text-white/70">
                  {project.description || project.summary}
                </p>

                {project.techStack.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {project.techStack.map((technology, index) => (
                      <li key={`${technology}-${index}`} className="text-xl text-accent">
                        {technology}
                        {index !== project.techStack.length - 1 && ","}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="border-2 border-gray-300 dark:border-white/20" />

                <div className="flex items-center gap-4">
                  {project.liveUrl && (
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <Link
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Open live project"
                              className="w-17.5 h-17.5 rounded-full bg-gray-200 dark:hover:bg-accent hover:bg-accent flex justify-center items-center group dark:bg-white/10"
                            />
                          }
                        >
                          <BsArrowUpRight className="dark:text-white text-3xl " />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Live project</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}

                  {project.repoUrl && (
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <Link
                              href={project.repoUrl}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Open project repository"
                              className="w-17.5 h-17.5 rounded-full bg-gray-200 hover:bg-accent dark:hover:bg-accent flex justify-center items-center group dark:bg-white/10"
                            />
                          }
                        >
                          <BsGithub className="dark:text-white text-3xl" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>GitHub repository</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full xl:w-[50%]">
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                className="xl:h-130 mb-12"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              >
                {projects.map((item) => (
                  <SwiperSlide key={item.id} className="w-full">
                    <div className="h-115 relative group flex justify-center items-center overflow-hidden rounded-3xl bg-pink-50/20">
                      <div className="absolute inset-0 w-full rounded-3xl bg-black/5 z-10" />
                      <div className="relative w-full h-full">
                        {item.thumbnailUrl && (
                          <Image
                            src={item.thumbnailUrl}
                            unoptimized
                            className="object-cover border-2 border-dashed dark:border-white rounded-3xl xl:h-115 xl:w-192.5 h-114.5 w-103"
                            alt={`${item.title} thumbnail`}
                            height={520}
                            width={770}
                          />
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                {projects.length > 1 && (
                  <WorkSliderBtn
                    containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                    btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all dark:border-2 dark:border-dotted dark:border-accent dark:outline dark:outline-1 dark:outline-dotted dark:outline-accent dark:outline-offset-2"
                  />
                )}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Work;
