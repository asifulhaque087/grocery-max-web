import { useRouter } from "next/router";
import Link from "next/link";

import { Formik, Form } from "formik";
import { LOGIN_USER } from "../graphql/mutations/userMutation";
import { useMutation } from "@apollo/client";
import { toErrorMap } from "../utils/toErrorMap";
import TextField from "../components/forms/TextField";
import { withApollo } from "../graphql/client";
import { useState } from "react";

const login = () => {
  const [state, setState] = useState({
    serverMessage: "",
    error: "",
  });
  const router = useRouter();
  const [login] = useMutation(LOGIN_USER);
  return (
    <Formik
      initialValues={{
        email: "userone@gmail.com",
        password: "123456",
      }}
      onSubmit={async (values, actions) => {
        const response = await login({ variables: values });

        if (response.data?.login.errors) {
          let errorsMap = toErrorMap(response.data?.login.errors);
          if (errorsMap.hasOwnProperty("error")) {
            setState({
              ...state,
              error: errorsMap.error,
            });
          }
          actions.setErrors(errorsMap);
        } else if (response.data?.login.user) {
          sessionStorage.setItem("jwtToken", response.data?.login.user.token);

          router.push("/shipping-info");
        }
      }}
    >
      {({ values, isSubmitting, errors }) => (
        <div className="w-full mx-auto max-w-3xl bg-white shadow p-8 text-gray-700 ">
          <h2 className="w-full  text-3xl font-bold leading-tight my-5 text-center">
            User Login Form
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
            <TextField
              name="email"
              type="email"
              placeholder="Email"
              label="Email"
            />
            <TextField
              name="password"
              type="password"
              placeholder="Password"
              label="Password"
            />

            <div>
              <button
                disabled={isSubmitting}
                className="w-full shadow bg-green-400 hover:bg-green-400 focus:shadow-outline
                focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Login
              </button>
            </div>
            <p className="text-blue-500">
              <Link href="/register">dont have a account?</Link>
            </p>
            <p className="text-blue-500">
              <Link href="/forgot-password">forgot password?</Link>
            </p>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: false })(login);
