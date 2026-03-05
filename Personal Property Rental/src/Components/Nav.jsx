import { NavLink, Link, useNavigate } from "react-router-dom";
import React, { useState, useRef, useContext } from "react";
import { dataContext } from "../Context/Usercontext";
import logo from "../assets/p.jpg";
import { motion } from "framer-motion";
import {
  Search,
  User,
  Flame,
  House,
  BedDouble,
  Store,
  WavesLadder,
  TentTree,
  ShelvingUnit,
  ShoppingCart,
  TreePine
} from "lucide-react";

function Nav() {

  const { search, setSearch } = useContext(dataContext);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const handleWheel = (e) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleSearch = () => {
    navigate("/");
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.07
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full fixed top-0 z-50 shadow-sm bg-white"
    >

      {/* Top Navbar */}
      <div className="w-full h-20 border-b border-zinc-300 flex items-center justify-between px-10 max-[800px]:px-3">

        {/* Logo */}
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-xl font-semibold"
          >
            <img className="w-[50px] max-[500px]:w-[35px]" src={logo} alt="" />
            <h1 className="text-red-600 max-[900px]:hidden cursor-pointer">
              Private Property Rental
            </h1>
          </motion.div>
        </Link>

        {/* Search */}
        <motion.div
          whileFocus={{ scale: 1.02 }}
          className="flex items-center gap-3 max-[800px]:gap-2"
        >

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="w-[250px] p-3 rounded-full border border-amber-700 
            text-red-700 outline-none focus:ring-2 focus:ring-red-400 transition
            max-[1000px]:w-[180px]
            max-[800px]:w-[130px]
            max-[500px]:w-[90px]
            max-[500px]:p-2
            max-[500px]:text-sm"
            type="text"
            placeholder="Search"
          />

          <motion.button
            onClick={handleSearch}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-3 
            bg-red-600 text-white rounded-full font-semibold 
            cursor-pointer transition-all duration-300 
            hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600
            max-[800px]:px-3
            max-[800px]:py-2
            max-[500px]:px-2
            max-[500px]:py-2"
          >
            <span className="max-[500px]:hidden">Search</span>
            <Search size={18} className="max-[500px]:w-5 max-[500px]:h-5" />
          </motion.button>

        </motion.div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          <Link to="/listing">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-red-500 border rounded-full px-4 py-2 
              font-semibold cursor-pointer transition-all duration-300 
              hover:bg-red-500 hover:text-white max-[900px]:hidden"
            >
              List Your Home
            </motion.button>
          </Link>

          {/* User Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpen(!open)}
              className="cursor-pointer border-2 border-red-500 rounded-full p-3 
              flex items-center justify-center text-red-500 
              transition-all duration-300 ease-in-out 
              hover:bg-red-500 hover:text-white
              max-[500px]:p-2"
            >
              <User className="w-5 h-5 max-[500px]:w-4 max-[500px]:h-4" />
            </motion.button>

            {open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-3 w-[220px] 
                bg-white shadow-2xl rounded-2xl py-3 
                flex items-start flex-col border border-zinc-200 z-[999]"
              >

                <Link to="/listing">
                  <button className="px-4 py-3 text-lg font-semibold 
                  cursor-pointer transition hover:bg-red-400 
                  hover:text-white hover:rounded-3xl rounded-xl mx-2">
                    List Your Home
                  </button>
                </Link>

                <Link to="/contact">
                  <button className="px-4 py-3 text-lg font-semibold 
                  cursor-pointer transition hover:bg-red-400 
                  hover:text-white hover:rounded-3xl rounded-xl mx-2">
                    Contact Us
                  </button>
                </Link>

              </motion.div>
            )}

          </div>

        </div>
      </div>

      {/* Category Scroll Section */}
      <motion.div
        ref={scrollRef}
        onWheel={handleWheel}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="nav2 flex items-center justify-center gap-8 mt-3 cursor-pointer 
        max-[800px]:justify-start 
        max-[800px]:px-4 
        overflow-x-auto overflow-y-hidden
        flex-nowrap whitespace-nowrap
        w-full scroll-smooth
        snap-x snap-mandatory"
      >

        {[
          { icon: <Flame />, label: "Trending", path: "/" },
          { icon: <House />, label: "House", path: "/houses" },
          { icon: <BedDouble />, label: "Rooms", path: "/rooms" },
          { icon: <Store />, label: "Farm House", path: "/farmhouse" },
          { icon: <WavesLadder />, label: "Pool House", path: "/poolhouse" },
          { icon: <TentTree />, label: "Tent House", path: "/tenthouse" },
          { icon: <ShelvingUnit />, label: "Cabins", path: "/cabins" },
          { icon: <ShoppingCart />, label: "Shops", path: "/shops" },
          { icon: <TreePine />, label: "Forest House", path: "/foresthouse" }
        ].map((item, index) => (

          <NavLink key={index} to={item.path}>
            {({ isActive }) => (
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className={`svg flex items-center justify-center flex-col
                transition-colors shrink-0 min-w-[90px]
                snap-start
                max-[500px]:min-w-[65px]
                max-[500px]:gap-1.5
                ${isActive ? "text-red-500 border-b-2 border-red-500" : "hover:text-red-500"}
                `}
              >

                <div className="max-[500px]:scale-75">
                  {item.icon}
                </div>

                <h3 className="font-light max-[500px]:text-xs max-[500px]:leading-tight">
                  {item.label}
                </h3>

              </motion.div>
            )}
          </NavLink>

        ))}

      </motion.div>

    </motion.div>
  );
}

export default Nav;