"use client";
import { motion } from "motion/react";
import React, { useState } from "react";

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

const projects = [
  {
    num: "01",
    category: "frontend",
    title: "project 1",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, architecto!",
    stack: [{ name: "Html 5" }, { name: "Css" }, { name: "Javascipt" }],
    image: "/assets/p.png",
    live: "",
    github: "",
  },
  {
    num: "02",
    category: "fullstack",
    title: "project 2",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, architecto!",
    stack: [{ name: "Html 5" }, { name: "Css" }, { name: "Javascipt" }],
    image: "/assets/q.jpg",
    live: "",
    github: "",
  },
  {
    num: "03",
    category: "frontend",
    title: "project 1",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, architecto!",
    stack: [{ name: "Html 5" }, { name: "Css" }, { name: "Javascipt" }],
    image: "/assets/r.png",
    live: "",
    github: "",
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);
  const handleSlideChange = (swiper)=>{
    // get current slide index
    const currentIndex = swiper.activeIndex;
    // update peoject state based on current slide index
    setProject(projects[currentIndex]);
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1,
        transition:{delay:2.4, duration:0.4, ease:"easeIn"}
       }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-7.5">
          <div className="w-full xl:w-[50%] xl:h-115 flex flex-col px-2 xl:justify-between order-2 xl:order-0">
            <div className="flex flex-col gap-7.5 h-[50%]">
              {/* Outline num */}
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              {/* Project category */}
              <h2 className="text-[42px] font-bold leading-none dark:text-white group-hover:text-accent transition-all duration-500 capitalize">{project.category} project</h2>

              {/* project description */}
              <p className="text-gray-700">{project.description}</p>

              {/* stack */}
              <ul className="flex gap-4">
                {project.stack.map((item, index)=>{
                  return (
                    <li key={index} className="text-xl text-accent">{item.name}
                    {/* remove the last comma's */}
                    {index !== project.stack.length-1 && ","}
                    </li>
                  )
                })}

              </ul>

              {/* border */}
              <div className="border-2 border-gray-300"></div>

              {/* buttons */}
              <div className="flex items-center gap-4">
                {/* Live project button */}
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-17.5 h-17.5 rounded-full bg-gray-200 flex justify-center items-center group">
                    <BsArrowUpRight className="dark:text-white text-3xl group-hover:"/>
                      </TooltipTrigger>
                      <TooltipContent>
                    <p>Live Project </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>

                {/*github project button  */}
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-17.5 h-17.5 rounded-full bg-gray-200 flex justify-center items-center group">
                    <BsGithub className="dark:text-white text-3xl group-hover:"/>
                      </TooltipTrigger>
                      <TooltipContent>
                    <p className="">Github repo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            
            <Swiper
            spaceBetween={30}
            slidesPerView={1}
            className="xl:h-130 mb-12"
            onSlideChange={handleSlideChange}
            >
              {projects.map((project,index)=>{
                return <SwiperSlide key={index}className="w-full">
                  <div className="h-115 relative group flex justify-center items-center bg-pink-50/20">

                  {/* overlay */}
                  <div className="absolute top-0 bottom-0 w-full bg-black/10 z-10"></div>

                  {/* image */}
                  <div className="relative w-full h-full">
                    <Image 
                    src={project.image}
                    className="object-cover xl:h-115 xl:w-192.5 h-114.5 w-103"
                    alt="project image"
                    height={520}
                    width={770}
                    />

                    
                  </div>


                  </div>
                  
                  </SwiperSlide>
              })}

              {/* slider button */}
                <WorkSliderBtn containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none "
                btnStyles={"bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"}
                />
            </Swiper>
            </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
