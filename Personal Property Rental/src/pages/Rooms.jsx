import React from 'react'
import Card from '../Components/Card'
import { motion } from "framer-motion"


import house from "../assets/house.jpg";
import house1 from "../assets/housekichen.jpg";
import house2 from "../assets/houseliving.jpg";
import house3 from "../assets/houseroom.jpg";

import room from "../assets/room.jpg";
import room1 from "../assets/room1.jpg";
import room2 from "../assets/room2.jpg";

import pool from "../assets/poolhouse.jpg";
import pool1 from "../assets/poolhouse2.jpg";

import old from "../assets/old.avif";
import old1 from "../assets/old1.avif";
import old2 from "../assets/old2.avif";
import old3 from "../assets/old3.avif";

import huthouse from "../assets/huthouse.jpg";
import huthouse1 from "../assets/huthouse1.jpg";
import huthouse2 from "../assets/huthouse2.jpg";

import air1 from "../assets/air1.avif";
import air2 from "../assets/air2.avif";
import air3 from "../assets/air3.avif";

const Rooms = () => {

  const propertyImages = [house, house1, house2, house3];
  const roomImages = [room, room1, room2];
  const poolImages = [pool, pool1];
  const oldImages = [old, old1, old2, old3];
  const huthouseImages = [huthouse, huthouse1, huthouse2];
  const airImages = [air1, air2, air3];
    
    
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
        <Card images={propertyImages} title="3BHK Apartment in Kolkata" price="₹28,000/month" />
      </motion.div>


      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={roomImages} title="1BHK Apartment in Chennai" price="₹75,000/month" />
      </motion.div>


      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={poolImages} title="3BHK Penthouse in Ahmedabad" price="₹55,000/month" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={oldImages} title="5BHK Luxury Villa in Hyderabad" price="₹16,500/month" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={huthouseImages} title="2BHK House in Bhubaneswar" price="₹19,000/month" />
      </motion.div>

      <motion.div variants={item} whileHover={{ scale: 1.05 }}>
        <Card images={airImages} title="3BHK Duplex in Indore" price="₹32,000/month" />
      </motion.div>
        
      
    </motion.div>
  )
}

export default Rooms
