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
        <div className="w-full mx-auto max-w-3xl bg-white shadow p-8 text-gray-700 ">
          <h2 className="w-full  text-3xl font-bold leading-tight my-5 text-center">
            User Forgot Password Form
          </h2>
          <p>
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email.
          </p>
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
          <Form>
            <TextField
              name="email"
              type="email"
              placeholder="Email"
              label="Email"
            />
            <div
              className={`${errors.hasOwnProperty("error") ? "" : "hidden"}`}
            >
              <TextField
                name="error"
                type="hidden"
                placeholder="Error"
                label="Error"
              />
            </div>
            <div>
              <button
                disabled={isSubmitting}
                className="w-full shadow bg-green-400 hover:bg-green-400 focus:shadow-outline
                focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Send Mail
              </button>
            </div>
            {/* <p className="text-blue-500">
              <Link href="/register">dont have a account?</Link>
            </p>
            <p className="text-blue-500">
              <Link href="/forgot-password">forgot password?</Link>
            </p> */}
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: true })(forgotPassword);
