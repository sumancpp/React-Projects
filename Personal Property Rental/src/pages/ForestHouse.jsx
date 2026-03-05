import React from 'react'
import Card from '../Components/Card'
import { motion } from "framer-motion"

import forest1 from '../assets/Forest/forest1.jpeg'
import forest2 from '../assets/Forest/forest2.jpg'
import forest3 from '../assets/Forest/forest3.jpeg'
import forest4 from '../assets/Forest/forest4.jpg'
import forest5 from '../assets/Forest/forest5.jpeg'
import forest6 from '../assets/Forest/forest6.jpeg'
import forest7 from '../assets/Forest/forest7.jpeg'
import forest8 from '../assets/Forest/forest8.jpeg'
import forest9 from '../assets/Forest/forest9.jpg'
import forest10 from '../assets/Forest/forest10.jpeg'
import forest11 from '../assets/Forest/forest11.jpeg'
import forest12 from '../assets/Forest/forest12.jpeg'
import forest13 from '../assets/Forest/forest13.jpeg'
import forest14 from '../assets/Forest/forest14.jpeg'
import forest15 from '../assets/Forest/forest15.jpeg'

const ForestHouse = () => {

  const forestHouse1 = [forest1, forest2, forest3]
  const forestHouse2 = [forest4, forest5, forest6]
  const forestHouse3 = [forest7, forest8, forest9]
  const forestHouse4 = [forest10, forest11, forest12]
  const forestHouse5 = [forest13, forest14, forest15]
  const forestHouse6 = [forest1, forest6, forest11]

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
        <Card images={forestHouse1} title="Forest Cabin Retreat" price="₹12,500/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={forestHouse2} title="Woodland Tree House" price="₹9,000/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={forestHouse3} title="Luxury Forest Villa" price="₹18,000/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={forestHouse4} title="Nature Escape Cottage" price="₹7,500/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={forestHouse5} title="Deep Forest Lodge" price="₹14,000/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={forestHouse6} title="Eco Forest Stay" price="₹10,500/night" />
      </motion.div>

    </motion.div>
  )
}

export default ForestHouse