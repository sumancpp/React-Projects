import { useContext } from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import { dataContext } from "../Context/Usercontext";

import house from "../assets/house.jpg";
import house1 from "../assets/housekichen.jpg";
import house2 from "../assets/houseliving.jpg";
import house3 from "../assets/houseroom.jpg";

import farmhouse from "../assets/farmhouse.jpg";
import farmhouse1 from "../assets/farmhouse1.jpg";
import farmhouse2 from "../assets/farmhouse2.jpg";

import roomhouse from "../assets/roomhouse.avif";
import roomhouse1 from "../assets/roomhouse1.avif";
import roomhouse2 from "../assets/roomhouse2.avif";

import mountain from "../assets/mountain.avif";
import mountain1 from "../assets/mountain1.avif";
import mountain2 from "../assets/mountain2.avif";
import mountain3 from "../assets/mountain3.avif";

import villa from "../assets/villa.jpg";
import villa1 from "../assets/villa1.jpg";
import villa2 from "../assets/villa3.jpg";

import village from "../assets/village.avif";
import village1 from "../assets/village1.avif";
import village2 from "../assets/village2.avif";
import village3 from "../assets/village3.avif";

import roomnew from "../assets/roomnew.avif";
import roomnew1 from "../assets/roomnew1.avif";
import roomnew2 from "../assets/roomnew2.avif";
import roomnew3 from "../assets/roomnew3.avif";

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

const Home = () => {

  const {
    title,
    price,
    image1,
    image2,
    image3,
    addListing,
    search
  } = useContext(dataContext);

  const propertyImages = [house, house1, house2, house3];
  const farmhouseImages = [farmhouse, farmhouse1, farmhouse2];
  const roomhouseImages = [roomhouse, roomhouse1, roomhouse2];
  const villaImages = [villa, villa1, villa2];
  const mountainImage = [mountain, mountain1, mountain2, mountain3];
  const villageImage = [village, village1, village2, village3];
  const roomnewImage = [roomnew, roomnew1, roomnew2, roomnew3];
  const roomImages = [room, room1, room2];
  const poolImages = [pool, pool1];
  const oldImages = [old, old1, old2, old3];
  const huthouseImages = [huthouse, huthouse1, huthouse2];
  const airImages = [air1, air2, air3];

  // PROPERTY DATA
  const properties = [
    { title: "3BHK Apartment in Kolkata", price: "₹28,000/month", category: "house", images: propertyImages },
    { title: "2BHK Flat in Bangalore", price: "₹22,500/month", category: "farmhouse", images: farmhouseImages },
    { title: "1BHK Villa in Jaipur", price: "₹45,000/month", category: "rooms", images: roomhouseImages },
    { title: "4BHK Studio in Mumbai", price: "₹80,000/month", category: "villa", images: villaImages },
    { title: "3BHK Independent House in Lucknow", price: "₹30,000/month", category: "house", images: mountainImage },
    { title: "5BHK Furnished Flat in Pune", price: "₹160,000/month", category: "flat", images: villageImage },
    { title: "1BHK Apartment in Chennai", price: "₹75,000/month", category: "rooms", images: roomnewImage },
    { title: "2BHK Builder Floor in Delhi", price: "₹24,000/month", category: "house", images: roomImages },
    { title: "3BHK Penthouse in Ahmedabad", price: "₹55,000/month", category: "poolhouse", images: poolImages },
    { title: "5BHK Luxury Villa in Hyderabad", price: "₹16,500/month", category: "villa", images: oldImages },
    { title: "2BHK House in Bhubaneswar", price: "₹19,000/month", category: "cabins", images: huthouseImages },
    { title: "3BHK Duplex in Indore", price: "₹32,000/month", category: "tenthouse", images: airImages }
  ];

  // SEARCH FILTER
  const filteredProperties = properties.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="home w-full min-h-screen flex items-center justify-center flex-wrap gap-7 mt-35"
    >

      {/* FILTERED PROPERTY CARDS */}
      {filteredProperties.map((property, index) => (
        <motion.div key={index} variants={item} whileHover={{ scale: 1.05 }}>
          <Card
            images={property.images}
            title={property.title}
            price={property.price}
          />
        </motion.div>
      ))}

      {/* USER CREATED LISTING */}
      {addListing && image1 && image2 && image3 && (
        <motion.div variants={item} whileHover={{ scale: 1.05 }}>
          <Card
            images={[
              URL.createObjectURL(image1),
              URL.createObjectURL(image2),
              URL.createObjectURL(image3)
            ]}
            title={title}
            price={`₹${price}/month`}
          />
        </motion.div>
      )}

    </motion.div>
  );
};

export default Home;