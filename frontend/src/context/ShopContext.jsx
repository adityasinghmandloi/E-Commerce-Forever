import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets"; // Ensure the correct path for products
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryFee = 10; // Consistent camelCase for variable names

  const [search, setSearch] = useState(""); // Initialize as empty string
  const [showSearch, setShowSearch] = useState(true); // Corrected naming for setter
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    // Clone the cartItems state to avoid direct mutation
    const cartData = structuredClone(cartItems);

    // Check if itemId exists
    if (cartData[itemId]) {
      // If the size exists, increment its count
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        // Otherwise, initialize the size with 1
        cartData[itemId][size] = 1;
      }
    } else {
      // If itemId doesn't exist, initialize with the size and quantity
      cartData[itemId] = { [size]: 1 };
    }

    // Update the state with the modified cartData
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    // Iterate over the cartItems
    for (const itemId of Object.keys(cartItems)) {
      const itemInfo = products.find((product) => product._id === itemId);

      // Check if itemInfo is found
      if (!itemInfo) {
        console.warn(`Product not found for ID: ${itemId}`);
        continue; // Skip to the next item if not found
      }

      // Iterate over sizes in the cart for the current item
      for (const size in cartItems[itemId]) {
        try {
          const quantity = cartItems[itemId][size];
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity; // Calculate total
          }
        } catch (error) {
          console.error(
            `Error processing item ${itemId}, size ${size}:`,
            error
          );
        }
      }
    }

    return totalAmount; // Return the total amount
  };

  useEffect(() => {
    //console.log(cartItems);
  }, [cartItems]);

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
