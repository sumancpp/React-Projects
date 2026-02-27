import { motion } from "framer-motion";
import React from "react";

const Marquee = () => {
  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed=".1"
      className="w-full bg-[#004D43] rounded-tl-3xl rounded-tr-3xl text-white overflow-hidden"
    >
      <div className="border-t border-b border-zinc-400 py-12 overflow-hidden">
        
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            ease: "linear",
            duration: 20,
            repeat: Infinity,
          }}
        >
          {/* Duplicate 4 times */}
          <h1 className="text-[15vw] leading-none font-semibold uppercase mr-10">
            we are ochi
          </h1>
          <h1 className="text-[15vw] leading-none font-semibold uppercase mr-10">
            we are ochi
          </h1>
          <h1 className="text-[15vw] leading-none font-semibold uppercase mr-10">
            we are ochi
          </h1>
          <h1 className="text-[15vw] leading-none font-semibold uppercase mr-10">
            we are ochi
          </h1>
        </motion.div>

      </div>
    </div>
  );
};

export default Marquee;