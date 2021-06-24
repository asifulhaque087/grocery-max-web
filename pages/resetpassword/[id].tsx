import { useRouter } from "next/router";

import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { toErrorMap } from "../../utils/toErrorMap";

import { useState } from "react";
import { RESET_PASSWORD_USER } from "../../graphql/mutations/userMutation";

import TextField from "../../components/forms/TextField";
import { withApollo } from "../../graphql/client";

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

          router.push("/");
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
              <h1 className="text-center font-bold text-2xl">Reset Password</h1>
              <Form
                onClick={() => {
                  setState({ ...state, serverMessage: "", error: "" });
                }}
              >
                <div className="my-5">
                  <TextField
                    name="password"
                    type="password"
                    placeholder="Password"
                    label="Password"
                  />
                </div>
                <div className="my-5">
                  <TextField
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    label="Confirm Password"
                  />
                </div>

                <div className="my-5">
                  <button
                    disabled={isSubmitting}
                    className="w-full shadow bg-green-400 hover:bg-green-400 focus:shadow-outline
                    focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    <div className="flex">
                      {isSubmitting && (
                        <div className="h-5 w-5 rounded-full border-dotted border-2  border-white animate-spin ease-linear mr-3"></div>
                      )}
                      <p>Reset Password</p>
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

export default withApollo({ ssr: false })(index);
