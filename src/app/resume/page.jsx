"use client";

import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs } from "react-icons/fa";

import {
  SiTailwindcss,
  SiNextdotjs,
  SiPostgresql,
  SiMongodb,
} from "react-icons/si";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "motion/react";

//about data
const about = {
  title: "About me",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem illo, neque doloribus atque perferendis porro nulla vitae laborum harum qui recusandae, saepe rerum veniam.",
  info: [
    {
      fieldName: "Name",
      fieldValue: " Arun Varma",
    },
    {
      fieldName: "Phone",
      fieldValue: " +91 82618 82236",
    },
    {
      fieldName: "Experience",
      fieldValue: " +1 Year",
    },
    {
      fieldName: "Nationality",
      fieldValue: " Indian",
    },
    {
      fieldName: "Github",
      fieldValue: " Arunvarma29",
    },
    {
      fieldName: "Email",
      fieldValue: " varmaarun580@gmail.com",
    },
    {
      fieldName: "Freelance",
      fieldValue: " Available",
    },
    {
      fieldName: "Language",
      fieldValue: " English",
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
      company: "Freelance",
      position: "Freelance Web Startup",
      duration: "2024 - Present",
    },
    {
      company: "Almabetter",
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
      institution: "Almabetter",
      degree:
        "Professional Fellowship in Software Engineering with AI & DevOps",
      duration: "2025 - Present",
    },
    {
      institution: "Sadguru Gadge Maharaj College, Karad",
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
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto max-w-350 px-4 ">
        <Tabs
          defaultValue="experience"
          className="flex flex-col lg:flex-row lg:gap-10 xl:flex-row "
        >
          <TabsList className="flex flex-col w-full max-w-95 mx-auto xl:mx-0">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="min-h-[70vh] w-full rounded-lg">

            {/* experience */}
            <TabsContent value="experience" className="w-full ">
              <div className="flex flex-col gap-7.5 text-center xl:text-left">
                <h3 className=" text-4xl xl:text-5xl font-bold">
                  {experience.title}
                </h3>
                <p className="max-w-190 text-gray-700 xl:text-lg font-semibold mx-auto xl:mx-0">
                  {experience.description}
                </p>
                <ScrollArea className={"h-100"}>
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-7.5">
                    {experience.info.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-46 py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className=" text-lg xl:text-xl text-white max-w-65 min-h-15 text-center lg:text-left">
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.company}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* education */}
            <TabsContent value="education" className="w-full ">
               <div className="flex flex-col gap-7.5 text-center xl:text-left">
                <h3 className=" text-4xl xl:text-5xl font-bold">
                  {education.title}
                </h3>
                <p className="max-w-190 text-gray-700 xl:text-lg font-semibold mx-auto xl:mx-0">
                  {education.description}
                </p>
                <ScrollArea className={"h-100"}>
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-7.5">
                    {education.info.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-46 py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-md xl:text-lg text-white max-w-65 min-h-15 text-center lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* skills */}
            <TabsContent value="skills" className="w-full h-full ">
              <div className="flex flex-col gap-7.5 ">
                <div className="flex flex-col gap-7.5 text-center xl:text-left">
                  <h3 className="text-4xl xl:text-5xl font-bold">{skills.title}</h3>
                <p className="max-w-150 text-center xl:text-left mx-auto xl:mx-0"> {skills.description} </p>
                
              </div>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-7.5 gap-4">
                {skills.skillList.map((skill,index)=>{
                  return <li key={index}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-full h-37.5 bg-[#d4d4d8] rounded-xl flex justify-center items-center group-[]:">
                          <div className="text-6xl group-hover:text-white transition-all duration-300">{skill.icon}</div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="capitalize">{skill.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    
                    </li>
                })}
              </ul>
              </div>
            </TabsContent>

            {/* about */}
            <TabsContent 
            value="about" 
            className="w-full text-center xl:text-left "
            >
              <div className="flex flex-col gap-7.5">

                <h3 className="text-4xl text-black xl:text-5xl font-bold">{about.title}</h3>
                <p className="max-w-190 text-md xl:text-lg  mx-auto xl:mx-0">{about.description}</p>

                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-190 mx-auto xl:mx-0"> 
                  {about.info.map((item,index)=>{
                    return(
                      <li key={index} className="flex items-center justify-center xl:justify-start gap-4">
                        <span className="text-green-700 text-sm">{item.fieldName}{":"}</span>
                        <span className="xl:text-xl text-[14px] ">{item.fieldValue}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
