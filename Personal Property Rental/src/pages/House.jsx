import React from 'react'
import Card from '../Components/Card'
import { motion } from "framer-motion"


import farmhouse from '../assets/farmhouse.jpg'
import farmhouse1 from '../assets/farmhouse1.jpg'
import farmhouse2 from '../assets/farmhouse2.jpg'
import roomhouse from '../assets/roomhouse.avif'
import roomhouse1 from '../assets/roomhouse1.avif'
import roomhouse2 from '../assets/roomhouse2.avif'
import mountain from '../assets/mountain.avif'
import mountain1 from '../assets/mountain1.avif'
import mountain2 from '../assets/mountain2.avif'
import mountain3 from '../assets/mountain3.avif'
import villa from '../assets/villa.jpg'
import villa1 from '../assets/villa1.jpg'
import villa2 from '../assets/villa3.jpg'
import village from '../assets/village.avif'
import village1 from '../assets/village1.avif'
import village2 from '../assets/village2.avif'
import village3 from '../assets/village3.avif'
import roomnew from '../assets/roomnew.avif'
import roomnew1 from '../assets/roomnew1.avif'
import roomnew2 from '../assets/roomnew2.avif'
import roomnew3 from '../assets/roomnew3.avif'


const House = () => {


      const farmhouseImages = [farmhouse, farmhouse1, farmhouse2];
      const roomhouseImages = [roomhouse, roomhouse1, roomhouse2];
      const villaImages = [villa, villa1, villa2];
      const mountainImage = [mountain, mountain1, mountain2, mountain3];
      const villageImage = [village, village1, village2, village3];
      const roomnewImage = [roomnew, roomnew1, roomnew2, roomnew3];


        const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Card animation
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
  };

  return (
    <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className='home w-full min-h-screen flex items-center justify-center flex-wrap gap-7 mt-35'
        >
        
         <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={farmhouseImages} title="2BHK Flat in Bangalore" price="₹22,500/month" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={roomhouseImages} title="1BHK Villa in Jaipur" price="₹45,000/month" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={villaImages} title="4BHK Studio in Mumbai" price="₹80,000/month" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={mountainImage} title="3BHK Independent House in Lucknow" price="₹30,000/month" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={villageImage} title="5BHK Furnished Flat in Pune" price="₹160,000/month" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={roomnewImage} title="1BHK Apartment in Chennai" price="₹75,000/month" />
      </motion.div>
        
      
    </motion.div>
  )
}

export default House
