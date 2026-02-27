import React from 'react'

const Cards = () => {
  return (
    <div className='w-full h-screen bg-white flex items-center px-20 gap-5 text-white'>
        <div className="cardcontainer h-[50vh] w-1/2 relative flex items-center justify-center">
           <div className="card relative rounded-xl w-full h-full bg-[#004D43] flex items-center justify-center">
            <img className='w-35' src="https://ochi.design/wp-content/uploads/2022/04/logo001.svg" alt="" srcset="" />
            <button className='absolute px-3 py-1 border-2 left-10 bottom-10 rounded-full'>&copy;2019-2026</button>
           </div>
        </div>
        <div className='cardcontainer gap-5 w-1/2 h-[50vh] relative flex '>
             <div className="card rounded-xl w-1/2 h-full bg-[#192326] flex items-center justify-center relative">
             <img className='w-35' src="https://ochi.design/wp-content/uploads/2022/04/logo002.svg" alt="" srcset="" />
            <button className='absolute px-1 py-1 border-2 left-5 bottom-10 rounded-full tracking-tighter'>RATING 5.0 ON CLUTCH</button>
             </div>
              <div className="card rounded-xl w-1/2 h-full bg-[#192326] flex items-center justify-center relative">
              <img className='w-35' src="https://ochi.design/wp-content/uploads/2022/04/logo003.png" alt="" srcset="" />
              <button className='absolute px-1 py-1 border-2 left-5 bottom-10 rounded-full tracking-tighter'>BUSINESS BOOTCAMP ALUMINI</button>
              </div>
        </div>
      
    </div>
  )
}

export default Cards
