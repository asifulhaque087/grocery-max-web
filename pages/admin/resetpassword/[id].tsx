import { useRouter } from "next/router";

import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { toErrorMap } from "../../../utils/toErrorMap";

import React, { useState } from "react";
import { RESET_PASSWORD_USER } from "../../../graphql/mutations/userMutation";

import { withApollo } from "../../../graphql/client";
import AauthTextField from "../../../components/forms/admin/AauthTextField";

const index = () => {
  const [state, setState] = useState({
    serverMessage: "",
    error: "",
  });
  const router = useRouter();
  const [resetPassword] = useMutation(RESET_PASSWORD_USER);

  return (
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
          let errorsMap: any = toErrorMap(response.data?.resetPassword.errors);
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
        <div className="w-full mx-auto max-w-3xl bg-white shadow p-8 text-gray-700 ">
          <h2 className="w-full  text-3xl font-bold leading-tight my-5 text-center">
            Admin Reset Password Form
          </h2>
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
            <AauthTextField
              name="password"
              type="password"
              placeholder="Password"
              label="Password"
            />
            <AauthTextField
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              label="Confirm Password"
            />

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
            {/* <p className="text-blue-500">
              <Link href="/admin/register">dont have a account?</Link>
            </p>
            <p className="text-blue-500">
              <Link href="/admin/forgot-password">forgot password?</Link>
            </p> */}
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: false })(index);
