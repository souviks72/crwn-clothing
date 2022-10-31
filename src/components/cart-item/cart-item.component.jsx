import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { name, price } = cartItem;
  return (
    <div>
      <h2>{name}</h2>
      <span>{price}</span>
    </div>
  );
};

export default CartItem;
