import { useReactiveVar } from "@apollo/client";
import {
  addToCart,
  cartAllPrices,
  cartItems,
  clearCart,
  decreaseItem,
  increaseItem,
  removeToCart,
} from "../../graphql/reactivities/cartVariable";

const Product = (props) => {
  const { product } = props;
  const { name, price } = product;

  return (
    <div>
      <div className="bg-red-50">
        <div>{name}</div>
        <div>{price}</div>
        <button
          className="bg-green-400 rounded"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
