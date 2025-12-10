"use client";
import { createContext, useContext, useState } from "react";

const CartBoolContext = createContext();

export const BooleanProvider = ({ children }) => {
  // cart should be CLOSED by default on page load
  const [isBooleanValue, setBooleanValue] = useState(false);

  return (
    <CartBoolContext.Provider value={{ isBooleanValue, setBooleanValue }}>
      {children}
    </CartBoolContext.Provider>
  );
};

export const useBooleanValue = () => {
  return useContext(CartBoolContext);
};
