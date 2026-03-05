import React from "react";
import { MoveUpRight } from "lucide-react";
import ochiSide from "../assets/ochi-side.jpg";
import { motion } from "framer-motion";

const LandingPage = () => {

  const reveal = {
    initial: { y: "100%" },
    animate: {
      y: "0%",
      transition: {
        duration: 1,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed="-.3"
      className="w-full h-screen pt-1 overflow-hidden"
    >
      <div className="mt-40 px-20 space-y-4">

        {/* LINE 1 */}
        <div className="overflow-hidden">
          <motion.h1
            variants={reveal}
            initial="initial"
            animate="animate"
            className="text-8xl leading-[6vw] tracking-tighter font-bold"
          >
            WE CREATE
          </motion.h1>
        </div>

        {/* LINE 2 */}
        <div className="flex items-end overflow-hidden">
          
          {/* Image reveal */}
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: "8vw",
              transition: {
                delay: 0.3,
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1]
              }
            }}
            className="mr-[1vw] h-[5.7vw] rounded-md overflow-hidden"
          >
            <img src={ochiSide} alt="" className="h-full object-cover" />
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              variants={reveal}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="text-8xl leading-[6vw] tracking-tighter font-bold"
            >
              EYE-OPENING
            </motion.h1>
          </div>
        </div>

        {/* LINE 3 */}
        <div className="overflow-hidden">
          <motion.h1
            variants={reveal}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
            className="text-8xl leading-[6vw] tracking-tighter font-bold"
          >
            PRESENTATIONS
          </motion.h1>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-zinc-700 mt-32 flex justify-between items-center py-5 px-20">
        {[
          "For public and private companies",
          "From the first pitch to IPO"
        ].map((item, index) => (
          <p key={index} className="text-md font-light tracking-tight leading-none">
            {item}
          </p>
        ))}

        <div className="flex items-center gap-2">
          <div className="px-5 py-2 border-2 border-zinc-500 rounded-full font-light text-md uppercase cursor-pointer">
            Start the project
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-zinc-500 flex items-center justify-center cursor-pointer">
            <MoveUpRight className="rotate-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;