import React, { useContext } from "react";
import { motion } from "framer-motion";
import { CirclePlus } from "lucide-react";
import { dataContext } from "../Context/Usercontext";

const Listing = () => {

  const {
    title,
    setTitle,
    price,
    setPrice,
    location,
    setLocation,
    image1,
    setImage1,
    image2,
    setImage2,
    image3,
    setImage3,
    setAddListing
  } = useContext(dataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddListing(true);
    alert("Listing added successfully");
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center px-4 py-20 pt-40">

      <form onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl bg-white border border-red-100 shadow-xl rounded-2xl p-8"
        >

          <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
            Create a New Listing
          </h1>

          <div className="flex flex-col gap-5">

            <input
              type="text"
              placeholder="2BHK Apartment Delhi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 font-light"
              required
            />

            <textarea
              placeholder="Description"
              className="border border-gray-300 rounded-lg px-4 py-3 font-light"
            />

            <div className="grid grid-cols-3 gap-4 font-light">

              {/* Image 1 */}
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-red-300 rounded-xl p-4 cursor-pointer hover:bg-red-50 transition relative overflow-hidden">

                {image1 ? (
                  <>
                    <img
                      src={URL.createObjectURL(image1)}
                      alt="preview"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <span className="text-green-600 text-sm mt-2 font-semibold">
                      Image Uploaded ✓
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-red-500 font-semibold">Upload Image</span>
                    <span className="text-sm text-gray-400">Click to browse</span>
                  </>
                )}

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setImage1(e.target.files[0])}
                  required
                />
              </label>


              {/* Image 2 */}
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-red-300 rounded-xl p-4 cursor-pointer hover:bg-red-50 transition">

                {image2 ? (
                  <>
                    <img
                      src={URL.createObjectURL(image2)}
                      alt="preview"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <span className="text-green-600 text-sm mt-2 font-semibold">
                      Image Uploaded ✓
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-red-500 font-semibold">Upload Image</span>
                    <span className="text-sm text-gray-400">Click to browse</span>
                  </>
                )}

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setImage2(e.target.files[0])}
                  required
                />
              </label>


              {/* Image 3 */}
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-red-300 rounded-xl p-4 cursor-pointer hover:bg-red-50 transition">

                {image3 ? (
                  <>
                    <img
                      src={URL.createObjectURL(image3)}
                      alt="preview"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <span className="text-green-600 text-sm mt-2 font-semibold">
                      Image Uploaded ✓
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-red-500 font-semibold">Upload Image</span>
                    <span className="text-sm text-gray-400">Click to browse</span>
                  </>
                )}

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setImage3(e.target.files[0])}
                />
              </label>

            </div>

            <input
              type="text"
              placeholder="₹25,000/month"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 font-light"
              required
            />

            <input
              type="text"
              placeholder="City / Country"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 font-light"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-red-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              Add <CirclePlus />
            </motion.button>

          </div>

        </motion.div>
      </form>

    </div>
  );
};

export default Listing;