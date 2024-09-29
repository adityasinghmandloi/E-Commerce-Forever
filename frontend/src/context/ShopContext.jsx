import React, { createContext, useState } from "react";
import { products } from "../assets/assets"; // Ensure the correct path for products

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryFee = 10; // Consistent camelCase for variable names

  const [search, setSearch] = useState(""); // Initialize as empty string
  const [showSearch, setShowSearch] = useState(true); // Corrected naming for setter

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch, // Updated to match naming convention
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

