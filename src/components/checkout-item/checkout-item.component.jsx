import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

const CheckoutItem = ({ item }) => {
  const { removeItemFromCart, incItemCount, decItemCount } =
    useContext(CartContext);
  const { id, name, price, quantity, imageUrl } = item;

  const handleMinus = () => {
    decItemCount(id);
  };

  const handlePlus = () => {
    incItemCount(id);
  };

  const deleteCartItem = () => {
    removeItemFromCart(id);
  };

  return (
    <div className="checkout-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <p className="name">{name}</p>
      <p className="quantity">
        <span id="minus" onClick={handleMinus}>
          {"<"}
        </span>
        <span>{quantity}</span>
        <span id="plus" onClick={handlePlus}>
          {">"}
        </span>
      </p>
      <p className="price">{price}</p>
      <p className="remove" onClick={deleteCartItem}>
        X
      </p>
    </div>
  );
};

export default CheckoutItem;
