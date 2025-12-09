import React from 'react'
import image1 from "../assets/image1.avif"
import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { toast } from "react-toastify";

function Card({ name, image, id, price, type }) {
  const dispatch = useDispatch();

  return (
    <div className='w-[300px] h-[400px] bg-white p-3 rounded-lg flex flex-col gap-3 shadow-lg hover:border-4 border-green-300 transition-all'>
      <div className='w-full h-[60%] overflow-hidden rounded-lg'>
        <img src={image} alt={name} className='object-cover w-full h-full' />
      </div>

      <div className='text-3xl font-semibold'>{name}</div>

      <div className='w-full flex justify-between items-center'>
        <div className='text-2xl font-extrabold text-green-500'>
          Rs {price}/-
        </div>
        <div className='flex justify-center items-center gap-2 text-green-500 text-2xl font-bold'>
          {type === "veg" ? <LuLeafyGreen /> : <GiChickenOven />}
          <span>{type}</span>
        </div>
      </div>

      <
        button
        className='w-full p-4 bg-green-500 text-white text-xl rounded-lg hover:bg-green-700 transition-all hover:text-2xl cursor-pointer'
        onClick={() =>
          {dispatch(addItem({ id, name, price, image, qty: 1 }));
         toast.success(<span className="font-bold">Item Added ✅</span>);
        }
        }
      >
        Add to Dish
      </button>
    </div>
  );
}

export default Card;
