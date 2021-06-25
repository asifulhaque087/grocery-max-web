import { useRouter } from "next/router";
import Link from "next/link";

import { Formik, Form } from "formik";
import { LOGIN_USER } from "../../graphql/mutations/userMutation";
import { useMutation } from "@apollo/client";
import { toErrorMap } from "../../utils/toErrorMap";
import { withApollo } from "../../graphql/client";
import { useState } from "react";
import { UserIcon } from "@heroicons/react/outline";
import AauthTextField from "../../components/forms/admin/AauthTextField";
import { loggedInUserVar } from "../../graphql/reactivities/userVariable";

const login = () => {
  const [state, setState] = useState({
    serverMessage: "",
    error: "",
  });
  const router = useRouter();
  const [login] = useMutation(LOGIN_USER);
  return (
    <div className="bg-gray-500 h-screen flex items-center px-2">
      <Formik
        initialValues={{
          email: "admin@gmail.com",
          password: "password",
        }}
        onSubmit={async (values, actions) => {
          const response = await login({ variables: values });

          if (response.data?.login.errors) {
            let errorsMap: any = toErrorMap(response.data?.login.errors);
            if (errorsMap.hasOwnProperty("error")) {
              setState({
                ...state,
                error: errorsMap.error,
              });
            }
            actions.setErrors(errorsMap);
          } else if (response.data?.login.user) {
            sessionStorage.setItem("jwtToken", response.data?.login.user.token);
            loggedInUserVar(response.data?.login.user);
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
                  name="email"
                  type="email"
                  placeholder="Email"
                  label="Email"
                />
              </div>
              <div>
                <AauthTextField
                  name="password"
                  type="password"
                  placeholder="Password"
                  label="Password"
                />
              </div>
              <div className="my-3 ">
                <p className="text-gray-800 text-center">
                  <Link href="/admin/forgot-password">Forgot password?</Link>
                </p>
              </div>

              <div>
                <button
                  disabled={isSubmitting}
                  className="w-full shadow bg-white hover:bg-green-400 focus:shadow-outline
                  focus:outline-none text-gray-700 font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default withApollo({ ssr: true })(login);
