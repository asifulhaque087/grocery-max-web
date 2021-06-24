import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import StripeCheckout from "react-stripe-checkout";
import userAuth from "../../auths/userAuth";
import { withApollo } from "../../graphql/client";
import { UPDATE_ORDER_TO_PAID } from "../../graphql/mutations/orderMutation";
import { GET_ORDER } from "../../graphql/queries/orderQuery";

import FullPageLoading from "../../components/skeletonLoading/FullPageLoading";

const index = () => {
  const router = useRouter();
  // fetching order by id
  const { loading, data: { getOrder: order } = {} } = useQuery(GET_ORDER, {
    variables: { id: router.query.id },
  });
  // update order to paid
  const [updateOrderToPaid, { loading: mutationLoading }] =
    useMutation(UPDATE_ORDER_TO_PAID);

  if (loading) {
    return (
      <div>
        <FullPageLoading />
      </div>
    );
  }
  const {
    user: { name, email },
    orderItems,
    shippingAddress: { phone, address },
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    isDelivered,
  } = order;

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
              User: {name}
            </p>
            <p className="pt-2 text-gray-400 text-xs font-medium text-center sm:text-left">
              {" "}
              Address: {address}
            </p>
            <p className="py-2 text-gray-400 text-xs font-medium text-center sm:text-left">
              Phone: {phone}
            </p>
            {isDelivered ? (
              <div className="p-2 bg-green-300 font-medium text-sm text-gray-600">
                <p>Delivered</p>
              </div>
            ) : (
              <div className="p-2 bg-red-300 font-medium text-sm text-gray-600">
                <p>Not Delivered</p>
              </div>
            )}
          </div>
          <hr className="mt-5" />
          <div>
            <h1 className="text-xl text-gray-600 font-medium py-2 text-center sm:text-left">
              Payment Method{" "}
            </h1>
            <p className="py-2 text-gray-400 text-xs font-medium text-center sm:text-left">
              {" "}
              Method: {paymentMethod}
            </p>
            {isPaid ? (
              <div className="p-2 bg-green-300 font-medium text-sm text-gray-600">
                <p>Paid</p>
              </div>
            ) : (
              <div className="p-2 bg-red-300 font-medium text-sm text-gray-600">
                <p>Not Paid</p>
              </div>
            )}
          </div>
          {/* <hr className="mt-5" /> */}
          <div className="mt-10">
            <h1 className="text-xl text-gray-600 font-medium py-2 text-center sm:text-left">
              Order Items{" "}
            </h1>
            <div>
              {orderItems &&
                orderItems.map((product, i) => (
                  <div
                    key={product.id}
                    className="border-b flex items-center justify-between py-5"
                  >
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
                        $ {product.price} / {product.count}{" "}
                        {product.product.unit}
                      </p>
                    </div>
                    <div className="text-gray-700 text-sm font-medium">
                      ${product.price * product.count}
                    </div>
                  </div>
                ))}
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
                <span>{itemPrice}</span>
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
            <div className="flex items-center justify-center my-4">
              {!isPaid && (
                <StripeCheckout
                  stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
                  token={async (token) => {
                    const response = await updateOrderToPaid({
                      variables: {
                        id: router.query.id,
                        email: token.email,
                        source: token.id,
                      },
                    });
                    if (response.data.updateOrderToPaid) {
                      // router.push(`/`);
                    }
                  }}
                  name="Grocery Max"
                  amount={totalPrice * 100}
                >
                  {/* <button className="px-3 py-1 my-4 rounded text-white font-medium bg-green-500">
                  place order
                </button> */}
                  {mutationLoading && (
                    <div className="flex items-center ">
                      <div className="h-5 w-5 rounded-full border-dotted border-2  border-blue-800 animate-spin ease-linear mr-3"></div>
                      <p>Pay With Cart</p>
                    </div>
                  )}
                </StripeCheckout>
              )}
            </div>
            <div className="flex items-center justify-center my-4">
              <button
                onClick={() => router.push("/")}
                className="px-3 py-1 my-4 rounded text-white font-medium bg-green-500"
              >
                Go Home
              </button>
            </div>
            {/* <div></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// export default  index;
export default withApollo({ ssr: false })(userAuth(index));
