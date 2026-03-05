import React, { useEffect, useState } from 'react'
import topView from '../assets/Top-View.jpg'

const Eyes = () => {

  const [rotate, setRotate] = useState(0)

  useEffect(() => {

    const handleMouseMove = (e) => {
      const mouseX = e.clientX
      const mouseY = e.clientY

      // distance from screen center
      const deltaX = mouseX - window.innerWidth / 2
      const deltaY = mouseY - window.innerHeight / 2

      // angle in degree
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI)

      setRotate(angle)
    }

    window.addEventListener("mousemove", handleMouseMove)

    // cleanup (VERY IMPORTANT)
    return () => window.removeEventListener("mousemove", handleMouseMove)

  }, [])

  return (
    <div className='eyes w-full h-screen overflow-hidden'>
      <div data-scroll
           data-scroll-speed="-.7"
        className='relative w-full h-full bg-cover bg-center'
        style={{ backgroundImage: `url(${topView})` }}
      >

        {/* Eyes Container */}
        <div className='absolute flex gap-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3'>

          {/* LEFT EYE */}
          <div className='flex items-center justify-center w-[15vw] h-[15vw] rounded-full bg-zinc-100'>
            <div className='relative w-2/3 h-2/3 rounded-full bg-zinc-900 flex items-center justify-center'>PLAY
              <div
                style={{ transform: `rotate(${rotate}deg)` }}
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-10 flex items-center justify-end'
              >
                <div className='w-10 h-10 rounded-full bg-zinc-100'></div>
              </div>
            </div>
          </div>

          {/* RIGHT EYE */}
          <div className='flex items-center justify-center w-[15vw] h-[15vw] rounded-full bg-zinc-100'>
            <div className='relative w-2/3 h-2/3 rounded-full bg-zinc-900 flex items-center justify-center'>PLAY
              <div
                style={{ transform: `rotate(${rotate}deg)` }}
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-10 flex items-center justify-end'
              >
                <div className='w-10 h-10 rounded-full bg-zinc-100'></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Eyes