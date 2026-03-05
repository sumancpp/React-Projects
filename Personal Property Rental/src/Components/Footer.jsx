import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"

const Footer = () => {
  return (
    <>
      <motion.div
        className='footer1 w-full bg-[#262626] flex flex-col md:flex-row items-center md:items-start justify-evenly gap-10 text-white px-6 py-10 '
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        <motion.div 
        className='flex flex-col items-center md:items-start justify-center gap-2 text-center md:text-left'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        >
            <h2 className='text-xl md:text-2xl font-semibold'>Contact Us</h2>
            <p>+910000000000</p>
            <p>abc12345@gmail.com</p>
            <p>Address,city/India</p>
        </motion.div>

        <motion.div 
        className='flex flex-col items-center md:items-start justify-center gap-2 text-center md:text-left'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        >
          <h2 className='text-xl md:text-2xl font-semibold'>Our Services</h2>
            <p className='cursor-pointer hover:text-red-400'>Home</p>
            <p className='cursor-pointer hover:text-red-400'>Add Listing</p>
            <p className='cursor-pointer hover:text-red-400'>Rent</p>
        </motion.div>

        <motion.div 
        className='flex flex-col items-center md:items-start justify-center gap-2 text-center md:text-left'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        >
          <h2 className='text-xl md:text-2xl font-semibold'>Quick Link</h2>

            <a 
            href="https://www.linkedin.com/in/suman-maity-b84879292/" 
            target="_blank"
            rel="noopener noreferrer"
            className='hover:text-red-400'
            >
            LinkedIn
            </a>

            <a 
            href="https://github.com/sumancpp" 
            target="_blank"
            rel="noopener noreferrer"
            className='hover:text-red-400'
            >
            Github
            </a>

            <p className='cursor-pointer hover:text-red-400'>Contact</p>
        </motion.div>


        <motion.div 
        className='flex flex-col items-center md:items-start justify-center gap-4 text-center md:text-left'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        >
           <h2 className='text-xl md:text-2xl font-semibold'>Private Property Rental</h2>

            <Link to="/contact">
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className='bg-red-600 w-36 md:w-40 h-11 md:h-12 rounded-3xl cursor-pointer text-lg md:text-xl font-semibold'
            >
            Contact Us
            </motion.button>
            </Link>

        </motion.div>
      </motion.div>

      <motion.div
        className='footer1 bg-[#262626] text-white w-full py-4 flex items-center justify-center text-center px-4'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.22 }}
      >
          <h2 className='text-sm md:text-lg'>
            &copy; Privacy Policy | Use of Terms
          </h2>
      </motion.div>
    </>
  )
}

export default Footer