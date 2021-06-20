import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import StripeCheckout from "react-stripe-checkout";
import userAuth from "../../auths/userAuth";
import { withApollo } from "../../graphql/client";
import { UPDATE_ORDER_TO_PAID } from "../../graphql/mutations/orderMutation";

import { GET_ORDER } from "../../graphql/queries/orderQuery";

const index = () => {
  const router = useRouter();
  const [updateOrderToPaid] = useMutation(UPDATE_ORDER_TO_PAID);
  const { loading, data: { getOrder: order } = {} } = useQuery(GET_ORDER, {
    variables: { id: router.query.id },
  });

  if (loading) {
    return <div>loading</div>;
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
      <div className="grid grid-cols-2">
        <div>
          <div>
            <h1 className="text-2xl">ORDER {router.query.id}</h1>
          </div>
          <div>
            <h1 className="text-2xl">SHIPPING</h1>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Address: {address}</p>
            {isDelivered ? (
              <div className="">Delivered</div>
            ) : (
              <div className="">Not Delivered</div>
            )}
          </div>
          <div>
            <h1 className="text-2xl">PAYMENT METHOD</h1>
            <p>Method: {paymentMethod}</p>
            {isPaid ? (
              <div className="">Paid</div>
            ) : (
              <div className="">Not Paid</div>
            )}
          </div>
          <div>
            <h1 className="text-2xl">ORDER ITEMS</h1>
            <div>
              {orderItems.map((product) => (
                <div key={product.name}>
                  <div className="flex">
                    <p>{product.photo}</p>
                    <p>{product.name}</p>
                    <p>{product.qty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="my-5">
            <h1 className="text-2xl">Order Summary </h1>
            <p>
              items : <span>{itemPrice}</span>
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
            {/* <button
              className="px-5 border border-green-500 inline-block mb-10"
              onClick={async () => {}}
            >
              {" "}
              Pay
            </button> */}

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
              }}
              name="Mudi Shop"
              amount={totalPrice * 100}
            ></StripeCheckout>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default  index;
export default withApollo({ ssr: false })(userAuth(index));
