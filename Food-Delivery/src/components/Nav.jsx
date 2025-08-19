import React, { useContext, useEffect } from 'react'
import { IoFastFoodSharp, IoSearchSharp } from "react-icons/io5";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { dataContext } from '../Context/UserContext';
import { food_items } from '../food';
import { useSelector } from 'react-redux';

function Nav() {
  const { input, setInput, setCate, setShowCart } = useContext(dataContext)

  useEffect(() => {
    let newlist = food_items.filter((item) =>
      item.food_name.toLowerCase().includes(input.toLowerCase())
    )
    setCate(newlist)
  }, [input, setCate])

  // ✅ get cart items from Redux
  const cartItems = useSelector(state => state.cart)

  return (
    <div className='w-full h-[100px] flex justify-between items-center px-5 md:px-8'>
      {/* Logo */}
      <div 
        className='group h-[70px] w-[70px] bg-white flex justify-center items-center 
                   rounded-b-md shadow-3xl hover:bg-green-400 active:bg-green-400 
                   cursor-pointer transition-all duration-200'
      >
        <IoFastFoodSharp 
          className='w-[40px] h-[40px] text-green-400 
                     group-hover:text-white group-hover:h-[50px] group-hover:w-[50px] 
                     active:text-white active:h-[50px] active:w-[50px]'
        />
      </div>

      {/* Search Bar */}
      <form
        className='w-[45%] h-[60px] bg-white flex items-center px-5 gap-5 
                   rounded-md shadow-2xl md:w-[70%]'
        onSubmit={(e) => e.preventDefault()}
      >
        <IoSearchSharp className='w-[35px] h-[35px] text-green-400 cursor-pointer' />
        <input
          type="text"
          placeholder='Search Items...'
          className='w-[100%] outline-none text-[16px] md:text-[20px]'
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </form>

      {/* Cart */}
      <div
        className='group h-[70px] w-[70px] bg-white flex justify-center items-center 
                   rounded-b-md shadow-3xl relative hover:bg-green-400 active:bg-green-400
                   cursor-pointer transition-all duration-200'
        onClick={() => setShowCart(true)}
      >
        {/* ✅ Show actual cart count */}
        <span className='absolute top-0 right-1 text-green-500 font-bold text-[19px] 
                         group-hover:text-white group-hover:text-[21px] 
                         active:text-white active:text-[21px]'>
          {cartItems.length}
        </span>
        <RiShoppingBag4Fill 
          className='w-[40px] h-[40px] text-green-400 
                     group-hover:text-white group-hover:h-[50px] group-hover:w-[50px] 
                     active:text-white active:h-[50px] active:w-[50px]'
        />
      </div>
    </div>
  )
}

export default Nav
