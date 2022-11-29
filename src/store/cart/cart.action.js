import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setCartItems = (cartItems) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);

export const setIsCartOpen = (isCartOpen) =>
  createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, isCartOpen);

const updateCartItemsReducer = (newCartItems) => {
  const newCartTotal = newCartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  );
  const newCartCount = newCartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
    cartItems: newCartItems,
    cartCount: newCartCount,
    cartTotal: newCartTotal,
  });
};

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const addItemToCart = (productToAdd, cartItems) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return updateCartItemsReducer(newCartItems);
};

export const removeItemToCart = (cartItemToRemove, cartItems) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return updateCartItemsReducer(newCartItems);
};

export const clearItemFromCart = (cartItemToClear, cartItems) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return updateCartItemsReducer(newCartItems);
};
