import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // find if productToAdd exists in cart
  const cartItemExists = cartItems.find((item) => item.id === productToAdd.id);

  //If found, increment quantity and return a new array
  if (cartItemExists) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  // return new array with productToAdd
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (id, cartItems) => {
  return [...cartItems.filter((item) => item.id !== id)];
};

const increaseItemQuantity = (id, cartItems) => {
  return cartItems.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  );
};

const decreaseItemQuantity = (id, cartItems) => {
  //if quantity is 1, remove item from cart
  const item = cartItems.filter((item) => item.id === id)[0];
  if (item.quantity === 1) {
    return removeCartItem(id, cartItems);
  } else {
    return cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  incItemCount: () => {},
  decItemCount: () => {},
  setCartItems: () => {},
  cartCount: 0,
  setCartCount: () => {},
  cartTotal: 0,
  setCartTotal: () => {},
});

export const CartContextProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const removeItemFromCart = (id) => {
    setCartItems(removeCartItem(id, cartItems));
  };

  const incItemCount = (id) => {
    setCartItems(increaseItemQuantity(id, cartItems));
  };

  const decItemCount = (id) => {
    setCartItems(decreaseItemQuantity(id, cartItems));
  };

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  useEffect(() => {
    let newCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    let newCartTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    cartTotal,
    incItemCount,
    decItemCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
