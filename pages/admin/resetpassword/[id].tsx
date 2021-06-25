import { useRouter } from "next/router";

import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { toErrorMap } from "../../../utils/toErrorMap";

import React, { useState } from "react";
import { RESET_PASSWORD_USER } from "../../../graphql/mutations/userMutation";

import { withApollo } from "../../../graphql/client";
import AauthTextField from "../../../components/forms/admin/AauthTextField";

import { UserIcon } from "@heroicons/react/outline";

const index = () => {
  const [state, setState] = useState({
    serverMessage: "",
    error: "",
  });
  const router = useRouter();
  const [resetPassword] = useMutation(RESET_PASSWORD_USER);

  return (
    <div className="bg-gray-500 h-screen flex items-center px-2">
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async (values, actions) => {
          const response = await resetPassword({
            variables: { ...values, resetToken: router.query.id },
          });

          if (response.data?.resetPassword.errors) {
            let errorsMap: any = toErrorMap(
              response.data?.resetPassword.errors
            );
            if (errorsMap.hasOwnProperty("error")) {
              setState({
                ...state,
                error: errorsMap.error,
              });
            }
            actions.setErrors(errorsMap);
          } else if (response.data?.resetPassword.user) {
            sessionStorage.setItem(
              "jwtToken",
              response.data?.resetPassword.user.token
            );

            router.push("/admin");
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
            <Form
              onClick={() => {
                setState({ ...state, serverMessage: "", error: "" });
              }}
            >
              <div className="my-3">
                <AauthTextField
                  name="password"
                  type="password"
                  placeholder="Password"
                  label="Password"
                />
              </div>
              <div className="my-3">
                <AauthTextField
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  label="Confirm Password"
                />
              </div>

              <div>
                <button
                  disabled={isSubmitting}
                  className="w-full shadow bg-green-400 hover:bg-green-400 focus:shadow-outline
                focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default withApollo({ ssr: false })(index);
