"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaCode,
  FaCss3,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
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

const skillIcons = {
  html: FaHtml5,
  html5: FaHtml5,
  css: FaCss3,
  css3: FaCss3,
  javascript: FaJs,
  js: FaJs,
  node: FaNodeJs,
  nodejs: FaNodeJs,
  react: FaReact,
  reactjs: FaReact,
  next: SiNextdotjs,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
};

const formatYear = (date) => (date ? String(date).slice(0, 4) : "");

const formatDuration = (item) => {
  const start = formatYear(item.start_date);
  const end = item.is_current || !item.end_date
    ? "Present"
    : formatYear(item.end_date);

  return start ? `${start} - ${end}` : end;
};

const Resume = () => {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchResume = async () => {
      try {
        const response = await fetch("/api/resume", {
          cache: "no-store",
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch resume data.");
        }

        setResume(result.data);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          console.error("Fetch resume error:", fetchError);
          setError("Unable to load resume data.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchResume();
    return () => controller.abort();
  }, []);

  const experience = resume?.experience || [];
  const education = resume?.education || [];
  const skills = resume?.skills || [];
  const profile = resume?.profile;
  const github = resume?.socialLinks?.find((link) =>
    link.platform?.toLowerCase().includes("github"),
  );
  const githubName = github?.url?.replace(/\/+$/, "").split("/").pop();
  const aboutInfo = [
    ["Name", profile?.full_name],
    ["Headline", profile?.headline],
    ["GitHub", githubName],
    ["Email", profile?.email],
    // ["Phone", profile?.phone],
    ["Location", profile?.location],
    ["Year Of Experience", "+1" ]
  ].filter(([, value]) => value);

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
            {loading && (
              <p role="status" className="mb-4 text-center">
                Loading resume data...
              </p>
            )}
            {error && (
              <p role="alert" className="mb-4 text-center text-red-500">
                {error}
              </p>
            )}

            {/* experience */}
            <TabsContent value="experience" className="w-full ">
              <div className="flex flex-col gap-7.5 text-center xl:text-left">
                <h3 className=" text-4xl xl:text-5xl font-bold">
                  My experience
                </h3>
                <p className="max-w-190 text-gray-700 dark:text-gray-300 xl:text-lg font-semibold mx-auto xl:mx-0">
                  My professional experience and roles.
                </p>
                <ScrollArea className={"h-100"}>
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-7.5">
                    {experience.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-46 py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{formatDuration(item)}</span>
                          <h3 className=" text-lg xl:text-xl text-white max-w-65 min-h-15 text-center lg:text-left">
                            {item.role}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.company}</p>
                          </div>
                          {item.location && (
                            <p className="text-sm text-white/50">{item.location}</p>
                          )}
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
                  My education
                </h3>
                <p className="max-w-190 text-gray-700 dark:text-gray-300 xl:text-lg font-semibold mx-auto xl:mx-0">
                  My academic background and education.
                </p>
                <ScrollArea className={"h-100"}>
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-7.5">
                    {education.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-46 py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{formatDuration(item)}</span>
                          <h3 className="text-md xl:text-lg text-white max-w-65 min-h-15 text-center lg:text-left">
                            {[item.degree, item.field_of_study].filter(Boolean).join(" - ")}
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
                  <h3 className="text-4xl xl:text-5xl font-bold">My Skills</h3>
                <p className="max-w-150 lg:text-lg dark:text-gray-300 text-center xl:text-left mx-auto xl:mx-0">Technologies and skills.</p>
                
              </div>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-5 gap-4">
                {skills.map((skill,index)=>{
                  const iconKey = String(skill.name).toLowerCase().replace(/[^a-z0-9]/g, "");
                  const Icon = skillIcons[iconKey] || FaCode;

                  return <li key={`${skill.name}-${index}`}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="group w-full h-35 rounded-4xl border border-transparent bg-[#d4d4d8] flex justify-center items-center dark:border-accent dark:bg-[#232329] dark:text-white">
                          <div className="text-7xl text-gray-900 group-hover:text-white transition-all duration-300 dark:text-white">
                            {skill.icon_url ? (
                              <Image
                                src={skill.icon_url}
                                alt=""
                                width={72}
                                height={72}
                                unoptimized
                                className="dark:brightness-0 dark:invert"
                              />
                            ) : (
                              <Icon />
                            )}
                          </div>
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

                <h3 className="text-4xl text-black dark:text-gray-300 xl:text-5xl font-bold">About me</h3>
                <p className="max-w-190 text-md xl:text-lg  mx-auto xl:mx-0">{profile?.bio || ""}</p>

                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-190 mx-auto xl:mx-0"> 
                  {aboutInfo.map(([fieldName, fieldValue])=>{
                    return(
                      <li key={fieldName} className="flex items-center justify-center xl:justify-start gap-4">
                        <span className="text-green-700 text-lg">{fieldName}{":"}</span>
                        <span className="xl:text-xl text-[14px] ">{fieldValue}</span>
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
