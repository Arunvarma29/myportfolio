import { motion, animate } from "motion/react";

const stairsAnimation = {
  initial: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
  exit: {
    top: ["100%", "0%"],
  },
};

// calculate the reverse index for  staggred delay
const reverseIndex = (index) => {
  const totalSteps = 7;
  return totalSteps - index - 1;
};

const Stairs = () => {
  return (
    <>
      {/* render  6 motion divs, each representing a step of the stairs. 
    Each div will have the same animation defined by the stairsAnimation object.
    The delay for each div is calculated dynamically based on it's reversed index,
    creating a staggered effect with decreasing delay for each subsequent step.
    */}

      {[...Array(7)].map((_, index) => {
        return(
            <motion.div
          key={index}
          variants={stairsAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            delay: reverseIndex(index) * 0.1,
          }}
          className="h-full w-full bg-blue-100 relative"
        />
        );
      })}
    </>
  );
};

export default Stairs;
