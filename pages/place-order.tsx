import { useMutation, useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import userAuth from "../auths/userAuth";
import { withApollo } from "../graphql/client";
import {
  ShoppingBagIcon,
  XIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
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
  const [createOrder, { loading: mutationLoading }] = useMutation(CREATE_ORDER);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 px-4 sm:px-20">
        <div>
          <div>
            <h1 className="text-xl text-gray-600 font-medium py-2 text-center sm:text-left">
              Shipping{" "}
            </h1>
            <p className="pt-2 text-gray-400 text-xs font-medium text-center sm:text-left">
              {" "}
              Address: {shippingAddress.address}
            </p>
            <p className="py-2 text-gray-400 text-xs font-medium text-center sm:text-left">
              Phone: {shippingAddress.phone}
            </p>
          </div>
          <hr className="mt-5" />
          <div>
            <h1 className="text-xl text-gray-600 font-medium py-2 text-center sm:text-left">
              Payment Method{" "}
            </h1>
            <p className="pt-2 text-gray-400 text-xs font-medium text-center sm:text-left">
              {" "}
              Method: {paymentMethod.paymentMethod}
            </p>
          </div>
          {/* <hr className="mt-5" /> */}
          <div className="mt-10">
            <h1 className="text-xl text-gray-600 font-medium py-2 text-center sm:text-left">
              Order Items{" "}
            </h1>
            <div>
              {cartProducts &&
                cartProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border-b flex items-center justify-between"
                  >
                    <div className="flex flex-col items-center">
                      <div onClick={() => increaseItem(product)}>
                        <ChevronUpIcon className="h-5 text-gray-300 cursor-pointer" />
                      </div>
                      <div>{product.count}</div>
                      <div onClick={() => decreaseItem(product)}>
                        <ChevronDownIcon className="h-5 text-gray-300 cursor-pointer" />
                      </div>
                    </div>
                    <div>
                      <img
                        src={`/images/${product.photo}`}
                        alt="product"
                        width={40}
                      />
                    </div>
                    <div className="px-3 ">
                      <p className="text-sm">{product.name}</p>
                      <p className="text-xs text-gray-400">
                        $ {product.price} / {product.qty} {product.unit}
                      </p>
                    </div>
                    <div className="text-gray-700 text-sm font-medium">
                      ${product.price * product.count}
                    </div>
                    <div onClick={() => removeToCart(product)}>
                      <XIcon className="h-5 text-red-400 cursor-pointer" />
                    </div>
                  </div>
                ))}
              {cartProducts.length !== 0 && (
                <>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() =>
                        window.confirm("Are you sure ?") && clearCart()
                      }
                      className="px-3 py-1 my-4 rounded text-white font-medium bg-red-500"
                    >
                      clear the cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="sm:pl-20">
          <div className="my-5">
            <h1 className="text-xl text-gray-600 font-medium py-2 text-center ">
              Order Summary{" "}
            </h1>
            <div className="grid grid-cols-2  w-full sm:5/6 md:w-3/5 sm:h-full mx-auto text-gray-600 font-medium text-center">
              <div className="border py-1 sm:py-2">items</div>
              <div className="border py-1 sm:py-2 ">
                <span>{cartItemsPrice}</span>
              </div>
              <div className="border py-1 sm:py-2">shipping</div>
              <div className="border py-1 sm:py-2">
                <span>{shippingPrice}</span>
              </div>
              <div className="border py-1 sm:py-2">tax</div>
              <div className="border py-1 sm:py-2">
                <span>{taxPrice}</span>
              </div>
              <div className="border py-1 sm:py-2">total</div>
              <div className="border py-1 sm:py-2">
                <span>{totalPrice}</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="px-3 py-1 my-4 rounded text-white font-medium bg-green-500 flex items-center"
                onClick={async () => {
                  if (cartProducts.length > 0) {
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
                    localStorage.removeItem("shoppingCart");
                    cartItems([]);
                    router.push(`/order/${response.data.createOrder.id}`);
                  }
                }}
              >
                <div className="flex items-center ">
                  {mutationLoading && (
                    <div className="h-5 w-5 rounded-full border-dotted border-2  border-white animate-spin ease-linear mr-3"></div>
                  )}
                  <p>place order</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default PlaceOrder;
export default withApollo({ ssr: false })(userAuth(PlaceOrder));
