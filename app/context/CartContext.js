"use client"; 

import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    case "UPDATE_CART":
      return action.payload;
    case "REMOVE_FROM_CART":
      return state.filter((item) => item._id !== action.payload);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], (initial) => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : initial;
    }
    return initial;
  });

  const [quantities, setQuantities] = useState(() => {
    if (typeof window !== "undefined") {
      const storedQuantities = localStorage.getItem("quantities");
      return storedQuantities ? JSON.parse(storedQuantities) : {};
    }
    return {};
  });

  const [selectedColors, setSelectedColors] = useState(() => {
    if (typeof window !== "undefined") {
      const storedColors = localStorage.getItem("selectedColors");
      return storedColors ? JSON.parse(storedColors) : {};
    }
    return {};
  });

  const [selectedSizes, setSelectedSizes] = useState(() => {
    if (typeof window !== "undefined") {
      const storedSizes = localStorage.getItem("selectedSizes");
      return storedSizes ? JSON.parse(storedSizes) : {};
    }
    return {};
  });

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("quantities", JSON.stringify(quantities));
  }, [quantities]);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("selectedColors", JSON.stringify(selectedColors));
  }, [selectedColors]);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("selectedSizes", JSON.stringify(selectedSizes));
  }, [selectedSizes]);

  useEffect(() => {
    const newSubtotal = cart.reduce((acc, item) => {
      const quantity = quantities[item._id] || 1;
      let price = Number(item.discount) || Number(item.price) || 0;

      if (item.color && item.color.length > 0) {
        const colorTitle = selectedColors[item._id] || item.color[0].title;
        const sizeTitle = selectedSizes[item._id] || item.color[0].sizes[0].size;

        const colorMatch = item.color.find(c => c.title === colorTitle);
        if (colorMatch && Array.isArray(colorMatch.sizes)) {
          const sizeMatch = colorMatch.sizes.find(s => s.size === sizeTitle);
          if (sizeMatch) price = sizeMatch.price;
        }
      }

      return acc + price * quantity;
    }, 0);

    setSubtotal(newSubtotal);
  }, [quantities, cart, selectedColors, selectedSizes]);

const addToCart = (item, quantity = 1, selectedColor, selectedSize) => {
  console.log("addToCart RECEIVED:", { item, quantity, selectedColor, selectedSize });

  // If user did NOT select manually → fallback to default
  const finalColor = selectedColor || item.color?.[0]?.title || "";
  const finalSize =
    selectedSize || item.color?.[0]?.sizes?.[0]?.size || "";

  // Check if item already exists in cart
  const existing = cart.find(ci =>
    ci._id === item._id &&
    ci.selectedColor === finalColor &&
    ci.selectedSize === finalSize
  );

  if (existing) {
    console.log("Updating EXISTING item in cart");

    const updated = cart.map(ci =>
      ci._id === item._id &&
      ci.selectedColor === finalColor &&
      ci.selectedSize === finalSize
        ? { ...ci, quantity: ci.quantity + quantity }
        : ci
    );

    dispatch({ type: "UPDATE_CART", payload: updated });
  } else {
    console.log("Adding NEW item to cart");

    const newItem = {
      ...item,
      quantity,
      selectedColor: finalColor,
      selectedSize: finalSize,
    };

    dispatch({
      type: "ADD_TO_CART",
      payload: [...cart, newItem],
    });
  }

  // Save quantities
  setQuantities(prev => ({
    ...prev,
    [item._id]: quantity,
  }));

  setSelectedColors(prev => ({
    ...prev,
    [item._id]: finalColor,
  }));

  setSelectedSizes(prev => ({
    ...prev,
    [item._id]: finalSize,
  }));

  console.log("Final cart:", [...cart]);
};


  const removeFromCart = (itemId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
    setQuantities(prev => { const { [itemId]: _, ...rest } = prev; return rest; });
    setSelectedColors(prev => { const { [itemId]: _, ...rest } = prev; return rest; });
    setSelectedSizes(prev => { const { [itemId]: _, ...rest } = prev; return rest; });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    setQuantities({});
    setSelectedColors({});
    setSelectedSizes({});
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        quantities,
        subtotal,
        selectedColors,
        selectedSizes,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export { CartProvider, useCart };
