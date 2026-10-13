"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";

const services = [
  {
    num: "01",
    title: "Web Development",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, perferendis consequatur voluptate nobis quia sint corporis quam architecto vitae eum magnam necessitatibus incidunt minima, recusandae ad ducimus fugiat? Quisquam, temporibus",
    href: "",
  },
  {
    num: "02",
    title: "UI/UX Design",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, perferendis consequatur voluptate nobis quia sint corporis quam architecto vitae eum magnam necessitatibus incidunt minima, recusandae ad ducimus fugiat? Quisquam, temporibus",
    href: "",
  },
  {
    num: "03",
    title: "Logo Design",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, perferendis consequatur voluptate nobis quia sint corporis quam architecto vitae eum magnam necessitatibus incidunt minima, recusandae ad ducimus fugiat? Quisquam, temporibus",
    href: "",
  },
  {
    num: "04",
    title: "SEO ",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, perferendis consequatur voluptate nobis quia sint corporis quam architecto vitae eum magnam necessitatibus incidunt minima, recusandae ad ducimus fugiat? Quisquam, temporibus",
    href: "",
  },
];

import { easeIn, motion } from "motion/react";

const Sevices = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 px-6 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.3, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-15"
        >
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/* top */}
                <div className="w-full  flex justify-between items-center">
                  <div className="text-7xl font-extrabold text-outline group-hover:text-accent text-transparent transition-all duration-500">
                    {service.num}
                  </div>
                  <Link
                    href={service.href}
                    className="w-17.5 h-17.5 rounded-full bg-white  group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45 border-dotted border-3"
                  >
                    <BsArrowDownRight className="text-3xl" />
                  </Link>
                </div>

                {/* title */}
                <h2 className="text-[42px] font-bold leading-none dark:text-white  group-hover:text-accent transition-all duration-500">
                  {service.title}
                </h2>
                {/* description */}
                <p className="dark:text-white/80">{service.description}</p>
                {/* border */}
                <div className="border-b border-2 bg-gray-300 border-white/20 w-full group-hover:bg-green-500"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Sevices;
