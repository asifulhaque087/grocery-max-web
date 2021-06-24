import Link from "next/link";

import { Formik, Form } from "formik";
import { FORGOT_PASSWORD_USER } from "../graphql/mutations/userMutation";
import { useMutation } from "@apollo/client";
import { toErrorMap } from "../utils/toErrorMap";
import TextField from "../components/forms/TextField";
import { withApollo } from "../graphql/client";
import { useState } from "react";

const forgotPassword = () => {
  const [state, setState] = useState({
    serverMessage: "",
    error: "",
  });
  const [forgotPassword] = useMutation(FORGOT_PASSWORD_USER);

  return (
    <Formik
      initialValues={{
        email: "",
        error: "",
      }}
      onSubmit={async (values, actions) => {
        const response = await forgotPassword({ variables: values });

        if (response.data?.forgotPassword.errors) {
          let errorsMap: any = toErrorMap(response.data?.forgotPassword.errors);
          if (errorsMap.hasOwnProperty("error")) {
            setState({
              ...state,
              error: errorsMap.error,
            });
          }
          actions.setErrors(errorsMap);
        } else if (response.data?.forgotPassword.url) {
          setState({
            ...state,
            serverMessage: response.data?.forgotPassword.url,
          });
        }
      }}
    >
      {({ values, isSubmitting, errors }) => (
        <div className="grid place-items-center h-screen w-full">
          <div className="flex rounded-md shadow-md border  overflow-hidden h-5/6 w-5/6 md:w-2/3 ">
            <div
              className="w-[40%] hidden sm:grid place-items-center h-full"
              style={{
                backgroundImage: `linear-gradient(to bottom,rgba(0,0,0, .7),
              rgba(0,0,0, .7)), url(${"/loginPhoto.jpg"})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div>
                <h1 className="text-center font-bold text-3xl text-yellow-500">
                  Grocery <span className="text-green-500">Max</span>{" "}
                </h1>
                <p className="text-gray-100 font-medium text-center px-10">
                  Sign in to continue to your account
                </p>
              </div>
            </div>
            <div className="w-[100%] sm:w-[60%]  p-3">
              <div>
                {state.serverMessage && (
                  <div className="bg-green-500 p-2 text-white font-semibold my-3">
                    {state.serverMessage}
                  </div>
                )}
                {state.error && (
                  <div className="bg-red-500 p-2 text-white font-semibold my-3">
                    {state.error}
                  </div>
                )}
              </div>
              <h1 className="text-center font-bold text-2xl">
                Forgot Password
              </h1>
              <p className="text-gray-400 mt-5">
                Please enter the email address you register your account with.
                We will send you reset password confirmation to this email.
              </p>
              <Form>
                <div className="my-5">
                  <TextField
                    name="email"
                    type="email"
                    placeholder="Email"
                    label="Email"
                  />
                </div>
                <div
                  className={`${
                    errors.hasOwnProperty("error") ? "" : "hidden"
                  }`}
                ></div>
                <div className="my-5">
                  <button
                    disabled={isSubmitting}
                    className="w-full shadow bg-green-400 hover:bg-green-400 focus:shadow-outline
                  focus:outline-none text-white font-bold py-2 px-4 rounded uppercase"
                    type="submit"
                  >
                    <div className="flex">
                      {isSubmitting && (
                        <div className="h-5 w-5 rounded-full border-dotted border-2  border-white animate-spin ease-linear mr-3"></div>
                      )}
                      <p>Send Email</p>
                    </div>
                  </button>
                </div>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: true })(forgotPassword);
