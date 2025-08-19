import React, { useState } from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeItem } from "../redux/cartSlice";
import { toast } from 'react-toastify'


function Card2({ name, price, image, id, qty }) {
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [hoveredDelete, setHoveredDelete] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='w-full h-[120px] p-2 shadow-lg flex justify-between bg-white rounded-lg'>
      {/* Left side */}
      <div className='w-[80%] h-full flex gap-5'>
        <div className='w-[50%] h-full overflow-hidden rounded-lg'>
          <img src={image} alt={name} className='object-cover w-full h-full' />
        </div>

        {/* Text + Quantity */}
        <div className='w-[40%] h-full flex flex-col gap-2'>
          <div className='text-[17px] text-gray-800 font-semibold'>{name}</div>

          {/* Quantity Control */}
          <div className='w-[110px] h-[50px] bg-slate-400 flex rounded-lg overflow-hidden shadow-lg border-2 border-green-400'>
            
            {/* Minus button */}
            <button
              className={`w-[30%] h-full flex justify-center items-center text-3xl cursor-pointer 
              ${hoveredBtn === 'minus' ? 'bg-green-300 text-gray-800' : 'bg-white text-green-500'}`}
              onMouseEnter={() => setHoveredBtn('minus')}
              onMouseLeave={() => setHoveredBtn(null)}
              onClick={() => dispatch(decreaseQty(id))}
            >
              -
            </button>

            {/* Count */}
            <span className='w-[40%] h-full bg-slate-200 flex justify-center items-center text-green-500 text-2xl'>
              {qty}
            </span>

            {/* Plus button */}
            <button
              className={`w-[30%] h-full flex justify-center items-center text-3xl cursor-pointer 
              ${hoveredBtn === 'plus' ? 'bg-green-300 text-gray-800' : 'bg-white text-green-500'}`}
              onMouseEnter={() => setHoveredBtn('plus')}
              onMouseLeave={() => setHoveredBtn(null)}
              onClick={() => dispatch(increaseQty(id))}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className='flex flex-col justify-start items-end gap-8'>
        <span className='text-xl text-green-500 font-semibold'>₹{price}/-</span>
        
        {/* Delete Button */}
        <RiDeleteBin5Fill
          className={`w-[35px] h-[35px] cursor-pointer 
          ${hoveredDelete ? 'text-red-500' : 'text-red-400'}`}
          onMouseEnter={() => setHoveredDelete(true)}
          onMouseLeave={() => setHoveredDelete(false)}
          onClick={() => {dispatch(removeItem(id))
          toast.success(<span className="font-bold">Order Removed ✅</span>);
          }
          }
        />
      </div>
    </div>
  )
}

export default Card2
