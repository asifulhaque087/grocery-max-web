import { useQuery, useReactiveVar } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { withApollo } from "../../graphql/client";
import { GET_SUB_PRO } from "../../graphql/queries/productQuery";

import Product from "../../components/default/Product";
import {
  addToCart,
  cartAllPrices,
  cartItems,
  clearCart,
  decreaseItem,
  increaseItem,
  removeToCart,
} from "../../graphql/reactivities/cartVariable";
import DefaultLayout from "../../layouts/default/DefaultLayout";

const SubCatToProduct = () => {
  const cartProducts = useReactiveVar(cartItems);
  const { cartItemsPrice, shippingPrice, taxPrice, totalPrice } =
    cartAllPrices();
  const router = useRouter();

  const { loading, data: { getSubToPro: products } = {} } = useQuery(
    GET_SUB_PRO,
    {
      variables: { subcategoryId: router.query.subcategoryId },
    }
  );

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <DefaultLayout>
      <div className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-4">
        {products &&
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((product) => (
            <div className="flex items-center my-5" key={product.id}>
              <div>{product.name}</div>
              <div>
                {" "}
                <img
                  src={`/images/product/${product.photo}`}
                  alt="product"
                  className="w-16"
                />
              </div>
              <div>{product.count}</div>
              <div
                className="text-red-500 pl-10"
                onClick={() => removeToCart(product)}
              >
                x
              </div>
              <div
                className="text-red-500 pl-10"
                onClick={() => increaseItem(product)}
              >
                +
              </div>
              <div
                className="text-red-500 pl-10"
                onClick={() => decreaseItem(product)}
              >
                -
              </div>
            </div>
          ))}
        {cartProducts.length !== 0 && (
          <>
            <div
              onClick={() => window.confirm("Are you sure ?") && clearCart()}
            >
              <p>clear the cart</p>
            </div>

            <li className="rounded border border-green-500 px-3 my-5 inline-block">
              <Link href="/shipping-info">proceed to checkout</Link>
            </li>
          </>
        )}
        <hr className="my-10" />
        <h1>order summary</h1>
        <div className="my-5">
          <p>
            items : <span>{cartItemsPrice}</span>
          </p>
          <p>
            shipping : <span>{shippingPrice}</span>
          </p>
          <p>
            tax : <span>{taxPrice}</span>
          </p>
          <p>
            total : <span>{totalPrice}</span>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default withApollo({ ssr: true })(SubCatToProduct);
