import React from 'react'
import Card from '../Components/Card'
import { motion } from "framer-motion"

import cabin1 from '../assets/Cabins/cabin1.jpeg'
import cabin2 from '../assets/Cabins/cabin2.jpeg'
import cabin3 from '../assets/Cabins/cabin3.jpeg'
import cabin4 from '../assets/Cabins/cabin4.jpeg'
import cabin5 from '../assets/Cabins/cabin5.jpeg'
import cabin6 from '../assets/Cabins/cabin6.jpeg'
import cabin7 from '../assets/Cabins/cabin7.jpg'
import cabin8 from '../assets/Cabins/cabin8.jpg'
import cabin9 from '../assets/Cabins/cabin9.jpeg'
import cabin10 from '../assets/Cabins/cabin10.jpg'
import cabin11 from '../assets/Cabins/cabin11.jpeg'
import cabin12 from '../assets/Cabins/cabin12.jpeg'
import cabin13 from '../assets/Cabins/cabin13.jpg'
import cabin14 from '../assets/Cabins/cabin14.jpeg'
import cabin15 from '../assets/Cabins/cabin15.jpeg'

const Cabins = () => {

  const cabinSet1 = [cabin1, cabin2, cabin3]
  const cabinSet2 = [cabin4, cabin5, cabin6]
  const cabinSet3 = [cabin7, cabin8, cabin9]
  const cabinSet4 = [cabin10, cabin11, cabin12]
  const cabinSet5 = [cabin13, cabin14, cabin15]
  const cabinSet6 = [cabin2, cabin6, cabin10]

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
      className='home w-full min-h-screen flex items-center justify-center flex-wrap gap-7 mt-35 border-b-1 border-red-600'
    >

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={cabinSet1} title="Forest Cabin Retreat" price="₹8,500/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={cabinSet2} title="Mountain View Cabin" price="₹9,200/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={cabinSet3} title="Luxury Wooden Cabin" price="₹12,000/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={cabinSet4} title="Riverside Cabin Stay" price="₹7,800/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={cabinSet5} title="Hilltop Cabin Escape" price="₹10,500/night" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={cabinSet6} title="Nature Wooden Lodge" price="₹9,000/night" />
      </motion.div>

    </motion.div>
  )
}

export default Cabins