import React from 'react'
import Card from '../Components/Card'
import { motion } from "framer-motion"

import shop1 from '../assets/Shops/shop1.jpg'
import shop2 from '../assets/Shops/shop2.jpeg'
import shop3 from '../assets/Shops/shop3.jpeg'
import shop4 from '../assets/Shops/shop4.jpg'
import shop5 from '../assets/Shops/shop5.jpeg'
import shop6 from '../assets/Shops/shop6.jpeg'
import shop7 from '../assets/Shops/shop7.jpeg'
import shop8 from '../assets/Shops/shop8.jpeg'
import shop9 from '../assets/Shops/shop9.jpeg'
import shop10 from '../assets/Shops/shop10.jpeg'
import shop11 from '../assets/Shops/shop11.jpeg'
import shop12 from '../assets/Shops/shop12.jpeg'
import shop13 from '../assets/Shops/shop13.jpg'
import shop14 from '../assets/Shops/shop14.jpeg'
import shop15 from '../assets/Shops/shop15.jpeg'

const Shops = () => {

  const shopSet1 = [shop1, shop2, shop3]
  const shopSet2 = [shop4, shop5, shop6]
  const shopSet3 = [shop7, shop8, shop9]
  const shopSet4 = [shop10, shop11, shop12]
  const shopSet5 = [shop13, shop14, shop15]
  const shopSet6 = [shop3, shop8, shop12]

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
        <Card images={shopSet1} title="Retail Shop in Delhi Market" price="₹35,000/month" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={shopSet2} title="Clothing Store in Kolkata" price="₹28,000/month" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={shopSet3} title="Electronics Shop in Mumbai" price="₹60,000/month" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={shopSet4} title="Bookstore in Bangalore" price="₹22,000/month" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={shopSet5} title="Cafe Shop Space in Pune" price="₹48,000/month" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={shopSet6} title="Mini Supermarket in Chennai" price="₹55,000/month" />
      </motion.div>

    </motion.div>
  )
}

export default Shops