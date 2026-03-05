import React from 'react'
import Card from '../Components/Card'
import { motion } from "framer-motion"

import tent1 from '../assets/Tent/tent1.jpeg'
import tent2 from '../assets/Tent/tent2.jpeg'
import tent3 from '../assets/Tent/tent3.jpeg'
import tent4 from '../assets/Tent/tent4.jpg'
import tent5 from '../assets/Tent/tent5.jpeg'
import tent6 from '../assets/Tent/tent6.jpeg'
import tent7 from '../assets/Tent/tent7.jpg'
import tent8 from '../assets/Tent/tent8.jpeg'
import tent9 from '../assets/Tent/tent9.jpeg'
import tent10 from '../assets/Tent/tent10.jpeg'
import tent11 from '../assets/Tent/tent11.jpeg'
import tent12 from '../assets/Tent/tent12.jpeg'
import tent13 from '../assets/Tent/tent13.jpg'
import tent14 from '../assets/Tent/tent14.jpeg'
import tent15 from '../assets/Tent/tent15.jpeg'

const Tent = () => {

  const tentSet1 = [tent1, tent2, tent3]
  const tentSet2 = [tent4, tent5, tent6]
  const tentSet3 = [tent7, tent8, tent9]
  const tentSet4 = [tent10, tent11, tent12]
  const tentSet5 = [tent13, tent14, tent15]
  const tentSet6 = [tent2, tent6, tent11]

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
        <Card images={tentSet1} title="Forest Camping Tent" price="₹2,500/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={tentSet2} title="Luxury Glamping Tent" price="₹4,200/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={tentSet3} title="Mountain Adventure Tent" price="₹3,000/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={tentSet4} title="Riverside Camping Tent" price="₹2,800/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={tentSet5} title="Desert Safari Tent" price="₹5,500/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={tentSet6} title="Eco Nature Tent Stay" price="₹3,200/night" />
      </motion.div>

    </motion.div>
  )
}

export default Tent