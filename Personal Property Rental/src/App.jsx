import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./Components/Home"
import Nav from "./Components/Nav"
import House from "./pages/House"
import Rooms from "./pages/Rooms"
import Farmhouse from "./pages/Farmhouse"
import Poolhouse from "./pages/Poolhouse"
import Tent from "./pages/Tent"
import Cabins from "./pages/Cabins"
import Shops from "./pages/Shops"
import ForestHouse from "./pages/ForestHouse"
import NotFound from "./pages/NotFound"
import Listing from "./Components/Listing"
import Contact from "./Components/Contact"
import Footer from "./Components/Footer"

function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/houses" element={<House />} />
        <Route path="/rooms" element={<Rooms/>} />
        <Route path="/farmhouse" element={<Farmhouse/>} />
        <Route path="/poolhouse" element={<Poolhouse/>} />
        <Route path="/tenthouse" element={<Tent/>} />
        <Route path="/cabins" element={<Cabins/>} />
        <Route path="/shops" element={<Shops/>} />
        <Route path="/foresthouse" element={<ForestHouse/>} />
        <Route path="/listing" element={<Listing/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>

      
       <Footer/>
       
    </>
  )
}

export default App