"use client";

import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs } from "react-icons/fa";

import {
  SiTailwindcss,
  SiNextdotjs,
  SiPostgresql,
  SiMongodb,
} from "react-icons/si";


import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs";

import { Tooltip,TooltipContent,TooltipProvider,TooltipTrigger } from "@/components/ui/tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";
import {motion} from "motion/react"

//about data
const about = {
  title: "About me",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem illo, neque doloribus atque perferendis porro nulla vitae laborum harum qui recusandae, saepe rerum veniam.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Arun Varma",
    },
    {
      fieldName: "Phone",
      fieldValue: "+91 82618 82236",
    },
    {
      fieldName: "Experience",
      fieldValue: "+1 Year",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Indian",
    },
    {
      fieldName: "Email",
      fieldValue: "varmaarun580@gmail.com",
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available",
    },
    {
      fieldName: "Language",
      fieldValue: "English",
    },
  ],
};

//experience data
const experience = {
  icon: "/assets/resume/",
  title: "My experience",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem illo, neque doloribus atque perferendis porro nulla vitae laborum harum qui recusandae, saepe rerum veniam.",
  info: [
    {
      comapany: "Freelance",
      position: "Freelance Web Startup",
      duration: "2024 - Present",
    },
    {
      comapany: "Almabetter",
      position: "Full Stack Developer",
      duration: "2025 - 2026",
    },
  ],
};

const education = {
  icon: "/assets/resume/",
  title: "My education",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem illo, neque doloribus atque perferendis porro nulla vitae laborum harum qui recusandae, saepe rerum veniam.",
  info: [
    {
      institutiion: "Almabetter",
      degree:
        "Professional Fellowship in Software Engineering with AI & DevOps",
      duration: "2025 - Present",
    },
    {
      institutiion: "Sadguru Gadge Maharaj College, Karad",
      degree: "B.Sc. in Computer Science",
      duration: "2021 - 2024",
    },
  ],
};

const skills = {
  title: "My Skills",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem illo, neque doloribus atque perferendis porro nulla vitae laborum harum qui recusandae, saepe rerum veniam.",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "Html 5",
    },
    {
      icon: <FaCss3 />,
      name: "CSS",
    },
    {
      icon: <FaJs />,
      name: "Javascript",
    },
    {
      icon: <FaNodeJs />,
      name: "NodeJs",
    },
    {
      icon: <FaReact />,
      name: "React.js",
    },
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "TailwindCSS",
    },
    {
      icon: <SiMongodb />,
      name: "MongoDB",
    },
    {
      icon: <SiPostgresql />,
      name: "PostgreSQL",
    },
  ],
};



const Resume = () => {
  return (
    <motion.div
    initial={{opacity:0}}
    animate={{
      opacity:1,
      transition:{delay:2.4, duration:0.4, ease:"easeIn"},
    }}
    className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs 
        defaultValue="experience"
        className="flex flex-col xl:flex-row gap-15"
        >
          <TabsList className="flex flex-col w-full max-w-95 mx-auto xl:mx-0">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="min-h-[70vh] w-full">

          {/* experience */}
          <TabsContent value="experience" className="w-full">

          </TabsContent>

          </div>
        </Tabs>
      </div>



    </motion.div>
  )
};

export default Resume;
