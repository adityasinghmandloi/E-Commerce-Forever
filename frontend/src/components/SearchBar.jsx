import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext"; // Ensure the correct path for context
import { assets } from "../assets/assets"; // Ensure the correct path for assets
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  const [visile, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  const hideSearchBar = () => {
    console.log("Hiding search bar...");
    setShowSearch(false); // Hide the search bar
  };

  return showSearch ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update the search state
        />
        <img className="w-4" src={assets.search_icon} alt="Search icon" />
      </div>
      <img
        onClick={hideSearchBar} // Hide the search bar on click
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt="Close icon"
      />
    </div>
  ) : null;
};

export default SearchBar;
