import { useReactiveVar } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import userAuth from "../auths/userAuth";
import { withApollo } from "../graphql/client";
import {
  paymentMethodVar,
  shippingAddressVar,
} from "../graphql/reactivities/checkoutProcessVariable";
import DefaultLayout from "../layouts/default/DefaultLayout";
import { toErrorMap } from "../utils/toErrorMap";

const PaymentInfo = () => {
  const router = useRouter();
  const shippingAddress = useReactiveVar(shippingAddressVar);

  if (Object.keys(shippingAddress).length == 0) {
    router.push("/shipping-info");
  }
  return (
    <DefaultLayout>
      <Formik
        initialValues={{
          paymentMethod: "stripe",
        }}
        onSubmit={(values, actions) => {
          let errorsMap = [
            {
              field: "paymentMethod",
              message: "payment method must be provided",
            },
          ];

          if (!values.paymentMethod) {
            actions.setErrors(toErrorMap(errorsMap));
          } else {
            localStorage.setItem("paymentMethod", JSON.stringify(values));
            paymentMethodVar(values);

            router.push("/place-order");
          }
        }}
      >
        {({ values, errors }) => (
          <div className="w-full mx-auto max-w-3xl bg-white  p-8 text-gray-700 ">
            <h2 className="w-full  text-3xl font-bold leading-tight my-5 text-center">
              Payment Methods
            </h2>

            <Form>
              <ErrorMessage
                component="div"
                name="paymentMethod"
                className="text-red-500"
              />
              <div className="flex items-center">
                <Field
                  name="paymentMethod"
                  type="radio"
                  value="cash-on-delivery"
                />
                <p className="pb-1 ml-2">cash on delivery</p>
              </div>
              <div className="flex items-center">
                <Field name="paymentMethod" type="radio" value="stripe" />
                <p className="pb-1 ml-2">stripe</p>
              </div>

              <div className="my-5">
                <button
                  className="w-full shadow bg-green-400 hover:bg-green-400 focus:shadow-outline
                focus:outline-none text-white font-bold py-2 px-4 rounded capitalize"
                  type="submit"
                >
                  Continue to order
                </button>
              </div>
              {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre> */}
            </Form>
          </div>
        )}
      </Formik>
    </DefaultLayout>
  );
};

// export default PaymentInfo;
export default withApollo({ ssr: false })(userAuth(PaymentInfo));
