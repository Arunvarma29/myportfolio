
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BsArrowDownRight } from "react-icons/bs";

const services = [
  {
    num: "01",
    title: "Web Development",
    description:
      "Responsive, accessible, high-performance websites built with React, Next.js, and modern web technologies.",
    href: "/contact",
  },
  {
    num: "02",
    title: "Full-Stack Development",
    description:
      "End-to-end applications with scalable APIs, secure authentication, database integration, and reliable backend systems.",
    href: "/contact",
  },
  {
    num: "03",
    title: "AI & Generative AI",
    description:
      "AI-powered applications using LLMs, RAG pipelines, prompt engineering, and intelligent automation.",
    href: "/contact",
  },
  {
    num: "04",
    title: "API & Backend Development",
    description:
      "REST APIs, PostgreSQL database design, backend integrations, and maintainable server-side architecture.",
    href: "/contact",
  },
];

const Services = () => {
  return (
    <section className="flex min-h-0 flex-col justify-center px-4 py-5 sm:px-6 sm:py-6 lg:h-[calc(100dvh-5rem)] lg:overflow-hidden xl:px-0">
      <div className="container mx-auto w-full max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.15,
              duration: 0.35,
              ease: "easeOut",
            },
          }}
          className="mb-5 max-w-2xl sm:mb-6 lg:mb-7"
        >
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent sm:text-sm">
            What I do
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl lg:text-4xl">
            Services I offer
          </h1>

          <p className="mt-2 max-w-xl text-md leading-5 text-gray-600 dark:text-white/60 sm:text-sm sm:leading-6">
            I build modern web applications and AI-powered
            solutions, focusing on usability, performance,
            and maintainable software.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 lg:gap-x-12 lg:gap-y-7"
        >
          {services.map((service) => (
            <motion.article
              key={service.num}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3 },
                },
              }}
              className="group flex min-w-0 flex-col"
            >
              {/* Number and arrow */}
              <div className="mb-3 flex items-center justify-between">
                <span className="text-5xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_#9ca3af] transition-colors duration-300 group-hover:text-accent sm:text-5xl lg:text-6xl">
                  {service.num}
                </span>

                <Link
                  href={service.href}
                  aria-label={`Discuss ${service.title}`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-900 transition-all duration-300 hover:-rotate-45 hover:border-accent hover:bg-accent hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-white/20 dark:text-white sm:h-10 sm:w-10 lg:h-11 lg:w-11"
                >
                  <BsArrowDownRight className="text-lg" />
                </Link>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold leading-tight text-gray-950 transition-colors duration-300 group-hover:text-accent dark:text-white sm:text-2xl lg:text-[26px]">
                {service.title}
              </h2>

              {/* Description */}
              <p className="mt-2 text-xs leading-5 text-gray-600 dark:text-white/60 sm:text-sm sm:leading-6">
                {service.description}
              </p>

              {/* Separator */}
              <div className="mt-4 h-px w-full bg-gray-200 transition-colors duration-300 group-hover:bg-accent dark:bg-white/15" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
