import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const Contact = () => {

  const handleSubmit = () => {
  
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center px-4 pt-40">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white border border-red-200 shadow-xl rounded-2xl p-8"
      >

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-red-500 text-center mb-6 flex items-center justify-center gap-2"
        >
          Contact Us
          <Mail className="w-8 h-8 text-red-500" />
        </motion.h1>

        {/* Form */}
        <form
          action="https://formspree.io/f/xkoqwzly"
          method="POST"
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          {/* Username */}
          <input
            type="text"
            placeholder="Your Name"
            required
            name="username"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition font-light"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Your Email"
            required
            name="email"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 transition font-light"
          />

          {/* Message */}
          <textarea
            placeholder="Your Message"
            rows="5"
            required
            name="message"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 resize-none transition font-light"
          />

          {/* Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer"
          >
            Send Message
          </motion.button>

        </form>

      </motion.div>
    </div>
  );
};

export default Contact;