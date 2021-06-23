import userAuth from "../auths/userAuth";

import { useRouter } from "next/router";

import { Formik, Form } from "formik";
import TextField from "../components/forms/TextField";
import { withApollo } from "../graphql/client";
import { toErrorMap } from "../utils/toErrorMap";
import { shippingAddressVar } from "../graphql/reactivities/checkoutProcessVariable";
import DefaultLayout from "../layouts/default/DefaultLayout";

const ShippingInfo = () => {
  const router = useRouter();
  return (
    <DefaultLayout>
      <Formik
        initialValues={{
          phone: "01903709156",
          address: "Central Rd, Dhaka 1205, Bangladesh",
        }}
        onSubmit={(values, actions) => {
          let errorsMap = [
            { field: "address", message: "address must be provided" },
            { field: "phone", message: "phone number must be provided " },
          ];

          if (!values.address && !values.phone) {
            actions.setErrors(toErrorMap(errorsMap));
          } else if (!values.address) {
            actions.setErrors(toErrorMap([errorsMap[0]]));
          } else if (!values.phone) {
            actions.setErrors(toErrorMap([errorsMap[1]]));
          } else {
            localStorage.setItem("shippingAddress", JSON.stringify(values));
            shippingAddressVar(values);
            router.push("/payment-info");
          }
        }}
      >
        {({ values, errors }) => (
          <div className="h-screen w-full mx-auto sm:w-3/4 lg:w-1/2 bg-white p-8 text-gray-700 pt-32">
            <h2 className="w-full  text-3xl font-bold leading-tight my-5 text-center">
              Shipping Address
            </h2>

            <Form>
              <div className="my-5">
                <TextField
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  label="Phone"
                />
              </div>
              <div className="my-5">
                <TextField
                  name="address"
                  type="text"
                  placeholder="Address"
                  label="Address"
                />
              </div>

              <div className="my-5">
                <button
                  className="w-full shadow bg-green-400 hover:bg-green-400 focus:shadow-outline
                focus:outline-none text-white font-bold py-2 px-4 rounded capitalize"
                  type="submit"
                >
                  Continue to payment
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

export default withApollo({ ssr: false })(userAuth(ShippingInfo));
