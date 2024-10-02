import React from "react";
import { assets } from "../admin_assets";
const Navbar = () => {
  return (
    <div>
      <img src={assets} alt="" />
      <button>Log Out</button>
    </div>
  );
};

export default Navbar;
