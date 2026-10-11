"use client";

import { motion } from "motion/react";
import Image from "next/image";

const Photo = () => {
  return (
    <div className=" w-full h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.4, ease: "easeIn" },
        }}
      >
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2, duration: 0.4, ease: "easeInOut" },
          }}
          className="w-74.5 h-74.5 xl:w-124.5 xl:h-124.5 absolute inset-12 mx-auto "
        >
          <Image
            src="/Avatar.png"
            priority
            quality={75}
            alt="photo"
            className="xl:w-[390px] xl:h-[390px] object-contain"
            height={"200"}
            width={"200"}
          />
        </motion.div>

        {/* Circular Svg */}
        <motion.svg
          className="w-75 xl:w-126.5 h-75 xl:h-126.5"
          fill="trasparent"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="250"
            cy="250"
            r="230"
            fill="var(--avatar-bg)"
            stroke="var(--avatar-ring)"
            strokeWidth="4"
            strokeLinecap='round'
            strokeLinejoin={"round"}
            initial={{strokeDasharray: "24 10 0 0"}}
            animate={{
                strokeDasharray:["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                rotate:[120,360],
             }}
             transition={{
                duration:20,
                repeat:Infinity,
                repeatType:"reverse",

             }}
          >

          </motion.circle>
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default Photo;
