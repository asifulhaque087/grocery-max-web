import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/mutations/userMutation";
import { withApollo } from "../../graphql/client";
import { useRouter } from "next/router";
import { toErrorMap } from "../../utils/toErrorMap";
import Link from "next/link";
import React from "react";
import AauthTextField from "../../components/forms/admin/AauthTextField";

const register = () => {
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
          actions.setErrors(toErrorMap(response.data?.register.errors));
        } else if (response.data?.register.user) {
          router.push("/admin");
        }
      }}
    >
      {({ values, isSubmitting, errors }) => (
        <div className="w-full mx-auto max-w-3xl bg-white shadow p-8 text-gray-700 ">
          <h2 className="w-full  text-3xl font-bold leading-tight my-5 text-center">
            Admin Register Form
          </h2>
          <Form>
            <AauthTextField
              name="name"
              type="text"
              placeholder="Name"
              label="Name"
            />
            <AauthTextField
              name="email"
              type="email"
              placeholder="Email"
              label="Email"
            />
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
                Register
              </button>
            </div>
            <p className="text-blue-500">
              <Link href="/admin/login">already have a account?</Link>
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
