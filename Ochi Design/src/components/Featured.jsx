import React, { useState } from "react";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import { motion, AnimatePresence } from "framer-motion";

const Featured = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full py-25 bg-zinc-100 text-black">
      
      {/* Section Heading */}
      <div className="w-full px-20 border-b border-zinc-700 pb-18">
        <h1 className="text-6xl tracking-tight">Featured projects</h1>
      </div>

      <div className="px-20 mt-15">
        <div className="relative w-full flex gap-10">

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
            <AnimatePresence mode="wait">
              {hovered && (
                <motion.h1
                  key={hovered}
                  initial={{ x: hovered === "left" ? -150 : 150, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: hovered === "left" ? -150 : 150, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-8xl font-bold text-[#CDEA68] whitespace-nowrap"
                >
                  {hovered === "left"
                    ? "SALIENCE LABS"
                    : "MEDALLIA EXPERIENCE"}
                </motion.h1>
              )}
            </AnimatePresence>
          </div>

          {/* LEFT CARD */}
          <motion.div
            onMouseEnter={() => setHovered("left")}
            onMouseLeave={() => setHovered(null)}
            animate={{
              scale:
                hovered === "left"
                  ? 0.95
                  : hovered === "right"
                  ? 1.05
                  : 1,
            }}
            transition={{ duration: 0.4 }}
            className="w-1/2 h-[80vh]"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={image1}
                alt="Salience Labs"
              />
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            onMouseEnter={() => setHovered("right")}
            onMouseLeave={() => setHovered(null)}
            animate={{
              scale:
                hovered === "right"
                  ? 0.95
                  : hovered === "left"
                  ? 1.05
                  : 1,
            }}
            transition={{ duration: 0.4 }}
            className="w-1/2 h-[80vh]"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={image2}
                alt="Medallia Experience"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Featured;