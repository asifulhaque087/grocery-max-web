import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import TextField from "../components/forms/TextField";
import { REGISTER_USER } from "../graphql/mutations/userMutation";
import { withApollo } from "../graphql/client";
import { useRouter } from "next/router";
import { toErrorMap } from "../utils/toErrorMap";
import Link from "next/link";
import { useState } from "react";

const register = () => {
  const [state, setState] = useState({
    serverMessage: "",
    error: "",
  });
  const router = useRouter();
  const [register] = useMutation(REGISTER_USER);

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={async (values, actions) => {
        const response = await register({ variables: values });

        if (response.data?.register.errors) {
          let errorsMap:any = toErrorMap(response.data?.register.errors);
          if (errorsMap.hasOwnProperty("error")) {
            setState({
              ...state,
              error: errorsMap.error,
            });
          }
          actions.setErrors(errorsMap);
        } else if (response.data?.register.user) {
          router.push("/");
        }
      }}
    >
      {({ values, isSubmitting, errors }) => (
        <div className="w-full mx-auto max-w-3xl bg-white shadow p-8 text-gray-700 ">
          <h2 className="w-full  text-3xl font-bold leading-tight my-5 text-center">
            User Register Form
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
          <Form>
            <TextField
              name="name"
              type="text"
              placeholder="Name"
              label="Name"
            />
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
            <TextField
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
                Register
              </button>
            </div>
            <p className="text-blue-500">
              <Link href="/login">already have a account?</Link>
            </p>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default withApollo({ ssr: false })(register);

// #06b6d4
