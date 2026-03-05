import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import categories from '../Category'
import Card from '../components/Card'
import { food_items } from '../food'
import { dataContext } from '../Context/UserContext'
import { ImCross } from "react-icons/im";
import Card2 from '../components/Card2'
import { useSelector } from 'react-redux'
import { TfiFaceSad } from "react-icons/tfi";
import { toast } from 'react-toastify'

function Home() {
  const { cate, setCate, input, showCart, setShowCart } = useContext(dataContext)
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [hoveredClose, setHoveredClose] = useState(false)

  function filter(category) {
    if (category.toLowerCase().trim() === "all") {
      setCate(food_items)
    } else {
      let newList = food_items.filter(
        (item) =>
          item.food_category.toLowerCase().trim() === category.toLowerCase().trim()
      )
      setCate(newList)
    }
  }

  const cartItems = useSelector(state => state.cart)
  let subtotal = cartItems.reduce((total,item)=>total+item.qty*item.price,0)
  let deliveryFee = 20;
  let taxes = subtotal*0.5/100;
  let total = Math.floor(subtotal + deliveryFee + taxes);
  
  

  return (
    <div className='bg-slate-200 w-full min-h-screen'>
      <Nav />
      
      {/* Categories */}
      {!input ? (
        <div className='flex flex-wrap justify-center gap-5 w-full'>
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => filter(item.name)}
              
              className={`group w-[140px] h-[150px] flex flex-col justify-center items-center gap-5 px-5 
              text-[22px] font-semibold rounded-lg shadow-xl cursor-pointer transition-all duration-200 
              ${hoveredCategory === index ? "bg-green-400 text-white" : "bg-white text-gray-700"}`}
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
              onTouchStart={() => setHoveredCategory(index)}
            >
              {item.icon}
              {item.name}
            </div>
          ))}
        </div>
      ) : null}

      {/* Food Items */}
      <div className='w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8'>
        {cate.length>1?cate.map((item) => (
          <Card
            key={item.id}
            name={item.food_name}
            image={item.food_image}
            price={item.price}
            id={item.id}
            type={item.food_type}
          />
        )):<div className="text-green-500 text-4xl mt-4 font-extrabold text-center pt-5 flex justify-between items-center gap-3">No Dish Found
        <TfiFaceSad className='font-bold'/></div>}
        
      </div>

      {/* Cart Sidebar */}
      <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-2xl p-6 transition-all duration-500 flex flex-col items-center overflow-auto ${showCart ? "translate-x-0" : "translate-x-full"}`}>
        <header className='w-full flex justify-between items-center'>
          <span className='text-green-500 text-[28px] font-semibold cursor-pointer 
            transition-all duration-200 
            hover:text-green-600'>
            Order Items
          </span>
          
          <ImCross
            className={`w-[30px] h-[30px] text-[25px] font-semibold cursor-pointer transition-all duration-200 
            ${hoveredClose ? "text-green-600 w-[35px] h-[35px]" : "text-green-400"}`}
            onClick={() => setShowCart(false)}
            onMouseEnter={() => setHoveredClose(true)}
            onMouseLeave={() => setHoveredClose(false)}
            onTouchStart={() => setHoveredClose(true)}
            onTouchEnd={() => setHoveredClose(false)}
          />
        </header>
        <>
  <div className="w-full mt-8 gap-5 flex flex-col items-center overflow-auto">
    {cartItems.length > 0 ? (
      <>
        {/* Cart Items */}
        {cartItems.map(item => (
          <Card2
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            qty={item.qty}
          />
        ))}

        {/* Subtotal, Delivery Fee, Taxes */}
        <div className="w-full border-t-2 border-b-2 border-gray-500 mt-6 flex flex-col gap-4 p-8">
          <div className="w-full flex justify-between items-center">
            <span className="text-2xl text-gray-700 font-semibold">SubTotal</span>
            <span className="text-green-500 font-bold text-2xl">₹{subtotal}/-</span>
          </div>
          <div className="w-full flex justify-between items-center">
            <span className="text-2xl text-gray-700 font-semibold">Delivery fee</span>
            <span className="text-green-500 font-bold text-2xl">₹{deliveryFee}/-</span>
          </div>
          <div className="w-full flex justify-between items-center">
            <span className="text-2xl text-gray-700 font-semibold">Taxes</span>
            <span className="text-green-500 font-bold text-2xl">₹{taxes}/-</span>
          </div>
        </div>

        {/* Total */}
        <div className="w-full flex justify-between items-center p-9">
          <span className="text-3xl text-gray-700 font-semibold">Total</span>
          <span className="text-green-500 font-bold text-3xl">₹{total}/-</span>
        </div>

        {/* Place Order Button */}
        <button className="w-[80%] p-4 bg-green-500 text-white text-xl rounded-lg hover:bg-green-700 transition-all hover:text-2xl cursor-pointer" onClick={(()=>{
          toast.success(<span className="font-bold">Order Placed ✅</span>);
        })}>
          Place Order
        </button>
      </>
    ) : (
      <p className="text-green-500 text-2xl mt-4 font-extrabold text-center pt-5">
        Your Cart is Empty
      </p>
    )}
  </div>
</>
      </div>

      {/* Footer */}
<footer className="bg-green-400 text-white mt-10">
  <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
    {/* Brand / About */}
    <div>
      <h2 className="text-2xl font-bold">🍴 FoodieHub</h2>
      <p className="mt-3 text-sm text-white">
        Fresh, fast, and delivered with love.  
        Order your favorite meals and enjoy a delicious experience.  
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
      <ul className="space-y-2 text-white">
        <li className="hover:text-black transition">Home</li>
        <li className="hover:text-black transition">Menu</li>
        <li className="hover:text-black transition">Cart</li>
        <li className="hover:text-black transition">Contact Us</li>
      </ul>
    </div>

    {/* Contact / Social */}
    <div>
      <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
      <p className="text-white">📍 Kolkata, India</p>
      <p className="text-white">📞 +91 1111 2222 33</p>
      <p className="text-white">✉ support@foodiehub.com</p>
      <div className="flex justify-center md:justify-start gap-4 mt-3">
        <a href="https://www.linkedin.com/in/suman-maity-b84879292/" className="hover:text-black transition">🌐</a>
        <a href="https://www.linkedin.com/in/suman-maity-b84879292/" className="hover:text-black transition">🐦</a>
        <a href="https://www.linkedin.com/in/suman-maity-b84879292/" className="hover:text-black transition">📘</a>
        <a href="https://www.linkedin.com/in/suman-maity-b84879292/" className="hover:text-black transition">📸</a>
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-green-700 py-4 text-center text-sm text-white">
    © {new Date().getFullYear()} FoodieHub. All rights reserved.
  </div>
</footer>

    </div>
  )
}

export default Home
