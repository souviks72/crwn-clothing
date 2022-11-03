import { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ item }) => {
  const { id, name, price, quantity, imageUrl } = item;

  const { removeItemFromCart, incItemCount, decItemCount } =
    useContext(CartContext);

  const handleMinus = () => decItemCount(id);
  const handlePlus = () => incItemCount(id);
  const deleteCartItem = () => removeItemFromCart(id);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>

      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={handleMinus}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={handlePlus}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={deleteCartItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
