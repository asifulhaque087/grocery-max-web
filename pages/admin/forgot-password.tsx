import { Formik, Form } from "formik";
import { FORGOT_PASSWORD_USER } from "../../graphql/mutations/userMutation";
import { useMutation } from "@apollo/client";
import { toErrorMap } from "../../utils/toErrorMap";
import { withApollo } from "../../graphql/client";
import React, { useState } from "react";
import AauthTextField from "../../components/forms/admin/AauthTextField";
import { UserIcon } from "@heroicons/react/outline";
import Link from "next/link";

const forgotPassword = () => {
  const [state, setState] = useState({
    serverMessage: "",
    error: "",
  });
  const [forgotPassword] = useMutation(FORGOT_PASSWORD_USER);

  return (
    <div className="bg-gray-500 h-screen flex items-center px-2">
      <Formik
        initialValues={{
          // email: "admin@gmail.com",
          email: "",
          error: "",
        }}
        onSubmit={async (values, actions) => {
          const response = await forgotPassword({ variables: values });

          if (response.data?.forgotPassword.errors) {
            let errorsMap: any = toErrorMap(
              response.data?.forgotPassword.errors
            );
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
          <div
            className="w-full sm:w-[50%] md:w-[30%] mx-auto max-w-3xl 
            p-8 text-gray-700 bg-[rgba(0,0,0,0.1)] rounded-md"
          >
            <div className="flex items-center justify-center">
              <div
                className="h-20 w-20 rounded-full bg-[rgba(0,0,0,0.1)] flex items-center 
              justify-center"
              >
                <UserIcon className="h-14 w-14 text-white" />
              </div>
            </div>
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
            <p className="text-gray-400 mt-5">
              Please enter the email address you register your account with. We
              will send you reset password confirmation to this email.
            </p>
            <Form>
              <div className="my-3">
                <AauthTextField
                  name="email"
                  type="email"
                  placeholder="Email"
                  label="Email"
                />
              </div>
              <div>
                <button
                  disabled={isSubmitting}
                  className="w-full shadow bg-white hover:bg-green-400 focus:shadow-outline
                  focus:outline-none text-gray-700 font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Send Email
                </button>
              </div>
              <div className="my-3 ">
                <p className="text-gray-800 text-center">
                  <Link href="/admin/login">Login</Link>
                </p>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default withApollo({ ssr: true })(forgotPassword);
