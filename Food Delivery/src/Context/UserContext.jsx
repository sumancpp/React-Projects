import React, { createContext, useState } from 'react'
import { food_items } from '../food'

export const dataContext = createContext()

function UserContext({ children }) {
  const [cate, setCate] = useState(food_items)
  const [input, setInput] = useState("")
  const [showCart, setShowCart] = useState(false)

  const data = {
    input,
    setInput,
    cate,
    setCate,
    showCart,
    setShowCart
  }

  return (
    <dataContext.Provider value={data}>
      {children}
    </dataContext.Provider>
  )
}

export default UserContext
