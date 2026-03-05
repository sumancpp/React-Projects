import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-white px-4">

      {/* 404 Text */}
      <motion.h1
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-[120px] md:text-[160px] font-extrabold tracking-widest text-red-500"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-2xl md:text-4xl font-bold text-center"
      >
        Page Not Found
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-400 mt-4 text-center max-w-md"
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition-all duration-300 font-semibold shadow-lg"
        >
          Go Back Home
        </Link>
      </motion.div>

      {/* Floating glow */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute w-[300px] h-[300px] bg-red-500/20 blur-[120px] rounded-full"
      />
    </div>
  )
}

export default NotFound
