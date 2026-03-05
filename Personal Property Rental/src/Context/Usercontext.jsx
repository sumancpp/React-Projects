import { createContext, useState } from "react";

export const dataContext = createContext();

const Usercontext = ({ children }) => {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const [addListing, setAddListing] = useState(false);

  // SEARCH STATE
  const [search, setSearch] = useState("");

  return (
    <dataContext.Provider
      value={{
        title,
        price,
        image1,
        image2,
        image3,
        addListing,
        setAddListing,
        search,
        setSearch
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export default Usercontext;