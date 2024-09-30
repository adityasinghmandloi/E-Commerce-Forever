import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, getCartAmount } = useContext(ShopContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const delivery_fee = 10; // Set a fixed delivery fee of $10

  useEffect(() => {
    const fetchCartAmount = async () => {
      const amount = await getCartAmount();
      setTotalAmount(amount);
    };

    fetchCartAmount();
  }, [getCartAmount]);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>SubTotal</p>
          <p>
            {currency}
            {totalAmount}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {totalAmount + delivery_fee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
