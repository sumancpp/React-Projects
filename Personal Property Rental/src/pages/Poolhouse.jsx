import React from 'react'
import Card from '../Components/Card'
import { motion } from "framer-motion"

import pool1 from '../assets/Pool/pool1.jpg'
import pool2 from '../assets/Pool/pool2.jpeg'
import pool3 from '../assets/Pool/pool3.jpeg'
import pool4 from '../assets/Pool/pool4.webp'
import pool5 from '../assets/Pool/pool5.jpeg'
import pool6 from '../assets/Pool/pool6.jpeg'
import pool7 from '../assets/Pool/pool7.jpeg'
import pool8 from '../assets/Pool/pool8.jpeg'
import pool9 from '../assets/Pool/pool9.jpeg'
import pool10 from '../assets/Pool/pool10.jpg'
import pool11 from '../assets/Pool/pool11.jpeg'
import pool12 from '../assets/Pool/pool12.jpeg'
import pool13 from '../assets/Pool/pool13.jpg'
import pool14 from '../assets/Pool/pool14.jpeg'
import pool15 from '../assets/Pool/pool15.jpeg'

const Poolhouse = () => {

  const poolSet1 = [pool1, pool2, pool3]
  const poolSet2 = [pool4, pool5, pool6]
  const poolSet3 = [pool7, pool8, pool9]
  const poolSet4 = [pool10, pool11, pool12]
  const poolSet5 = [pool13, pool14, pool15]
  const poolSet6 = [pool2, pool6, pool11]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className='home w-full min-h-screen flex items-center justify-center flex-wrap gap-7 mt-35'
    >

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={poolSet1} title="Luxury Pool Villa" price="₹18,000/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={poolSet2} title="Private Pool Apartment" price="₹12,500/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={poolSet3} title="Infinity Pool Resort Stay" price="₹22,000/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={poolSet4} title="Rooftop Pool House" price="₹15,500/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={poolSet5} title="Beachside Pool Villa" price="₹25,000/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={poolSet6} title="Modern Pool Retreat" price="₹14,000/night" />
      </motion.div>

    </motion.div>
  )
}

export default Poolhouse