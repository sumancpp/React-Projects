import React from 'react'
import Card from '../Components/Card'
import { motion } from "framer-motion"

import farm1 from '../assets/Farm/farm1.jpeg'
import farm2 from '../assets/Farm/farm2.jpeg'
import farm3 from '../assets/Farm/farm3.jpeg'
import farm4 from '../assets/Farm/farm4.jpeg'
import farm5 from '../assets/Farm/farm5.jpeg'
import farm6 from '../assets/Farm/farm6.jpeg'
import farm7 from '../assets/Farm/farm7.avif'
import farm8 from '../assets/Farm/farm8.jpeg'
import farm9 from '../assets/Farm/farm9.jpeg'
import farm10 from '../assets/Farm/farm10.jpg'
import farm11 from '../assets/Farm/farm11.jpeg'
import farm12 from '../assets/Farm/farm12.jpeg'
import farm13 from '../assets/Farm/farm13.avif'
import farm14 from '../assets/Farm/farm14.jpeg'
import farm15 from '../assets/Farm/farm15.jpeg'

const Farmhouse = () => {

  const farmSet1 = [farm1, farm2, farm3]
  const farmSet2 = [farm4, farm5, farm6]
  const farmSet3 = [farm7, farm8, farm9]
  const farmSet4 = [farm10, farm11, farm12]
  const farmSet5 = [farm13, farm14, farm15]
  const farmSet6 = [farm2, farm6, farm11]

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
        <Card images={farmSet1} title="Green Farmhouse Retreat" price="₹6,500/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={farmSet2} title="Organic Farm Stay" price="₹5,200/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={farmSet3} title="Village Farmhouse Escape" price="₹4,800/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={farmSet4} title="Luxury Farm Villa" price="₹9,500/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={farmSet5} title="Countryside Farmhouse" price="₹7,000/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={farmSet6} title="Eco Farm Stay" price="₹5,800/night" />
      </motion.div>

    </motion.div>
  )
}

export default Farmhouse