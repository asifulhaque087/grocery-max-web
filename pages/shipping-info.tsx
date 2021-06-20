import userAuth from "../auths/userAuth";

import { useRouter } from "next/router";

import { Formik, Form } from "formik";
import TextField from "../components/forms/TextField";
import { withApollo } from "../graphql/client";
import { toErrorMap } from "../utils/toErrorMap";
import { shippingAddressVar } from "../graphql/reactivities/checkoutProcessVariable";

const ShippingInfo = () => {
  const router = useRouter();
  return (
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
        <div className="w-full mx-auto max-w-3xl bg-white shadow p-8 text-gray-700 ">
          <h2 className="w-full  text-3xl font-bold leading-tight my-5 text-center">
            Shipping Address
          </h2>
          <Form>
            <TextField
              name="phone"
              type="text"
              placeholder="Phone"
              label="Phone"
            />
            <TextField
              name="address"
              type="text"
              placeholder="Address"
              label="Address"
            />

            <div>
              <button
                className="w-full shadow bg-green-400 hover:bg-green-400 focus:shadow-outline
                focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Continue
              </button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: false })(userAuth(ShippingInfo));
