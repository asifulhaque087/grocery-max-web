import { useMutation, useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import userAuth from "../auths/userAuth";
import { withApollo } from "../graphql/client";
import {
  paymentMethodVar,
  shippingAddressVar,
} from "../graphql/reactivities/checkoutProcessVariable";

import {
  cartAllPrices,
  cartItems,
  clearCart,
  decreaseItem,
  increaseItem,
  removeToCart,
} from "../graphql/reactivities/cartVariable";
import { CREATE_ORDER } from "../graphql/mutations/orderMutation";

const PlaceOrder = () => {
  const router = useRouter();
  const [createOrder] = useMutation(CREATE_ORDER);

  //   reactive variable data
  const cartProducts = useReactiveVar(cartItems);
  const { cartItemsPrice, shippingPrice, taxPrice, totalPrice } =
    cartAllPrices();
  const shippingAddress = useReactiveVar(shippingAddressVar);
  const paymentMethod = useReactiveVar(paymentMethodVar);

  if (Object.keys(shippingAddress).length == 0) {
    router.push("/shipping-info");
  }

  if (Object.keys(paymentMethod).length == 0) {
    router.push("/payment-info");
  }

  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          <h1 className="text-2xl">Shipping </h1>
          <p>Address: {shippingAddress.address}</p>
          <p>Phone Number: {shippingAddress.phone}</p>
          <hr />
          <h1 className="text-2xl">Payment Method</h1>
          <p>Method: {paymentMethod.paymentMethod}</p>
          <h1 className="text-2xl">Order Items</h1>
          <div>
            {cartProducts &&
              cartProducts.map((product) => (
                <div className="flex items-center my-5" key={product.id}>
                  <div>{product.name}</div>
                  <div className="px-3">{product.price}</div>
                  <div>
                    {" "}
                    <img
                      src={`/images/product/${product.photo}`}
                      //   alt="product"
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
                  onClick={() =>
                    window.confirm("Are you sure ?") && clearCart()
                  }
                >
                  <p>clear the cart</p>
                </div>
              </>
            )}
          </div>
        </div>
        <div>
          <div className="my-5">
            <h1 className="text-2xl">Order Summary </h1>
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
            <button
              className="px-5 border border-green-500 inline-block mb-10"
              onClick={async () => {
                const response = await createOrder({
                  variables: {
                    paymentMethod: paymentMethod.paymentMethod,
                    itemPrice: cartItemsPrice,
                    taxPrice,
                    shippingPrice,
                    totalPrice,
                    shippingAddress,
                    orderItems: cartProducts.map((item) => {
                      const { name, count, photo, price, id } = item;
                      return {
                        name,
                        count: count.toString(),
                        photo,
                        price,
                        product: id,
                      };
                    }),
                  },
                });

                // console.log("response", response);
                router.push(`/order/${response.data.createOrder.id}`);
              }}
            >
              {" "}
              place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default PlaceOrder;
export default withApollo({ ssr: false })(userAuth(PlaceOrder));
