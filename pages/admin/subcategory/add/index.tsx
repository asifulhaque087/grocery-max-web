import { useRouter } from "next/router";
import Link from "next/link";

import { Formik, Form, ErrorMessage, Field } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { toErrorMap } from "../../../../utils/toErrorMap";
import { withApollo } from "../../../../graphql/client";
import React, { useState } from "react";
import ATextField from "../../../../components/forms/admin/ATextField";
import AdminLayout from "../../../../layouts/admin/AdminLayout";
import { convertToBase64 } from "../../../../utils/convertToBase64";
import { GET_CATEGORIES_BY_ADMIN } from "../../../../graphql/queries/categoryQuery";
import { CREATE_SUBCATEGORY } from "../../../../graphql/mutations/subcategoryMutation";
import FullPageLoading from "../../../../components/skeletonLoading/FullPageLoading";
import { GET_SUBCATEGORIES } from "../../../../graphql/queries/subcategoryQuery";

const index = () => {
  const router = useRouter();
  const [state, setState] = useState({
    serverMessage: "",
    error: "",
  });
  const {
    loading: queryLoading,
    data: { getCategoriesByAdmin: categories } = {},
  } = useQuery(GET_CATEGORIES_BY_ADMIN);
  const [createSubcategory] = useMutation(CREATE_SUBCATEGORY);

  if (queryLoading) {
    return <FullPageLoading />;
  }

  return (
    <AdminLayout>
      <div>
        {/* breadcum */}
        <div className="block md:flex items-center justify-between px-5 bg-gray-50 shadow">
          <div>
            <h1 className="capitalize text-3xl font-medium text-center">
              subcategory
            </h1>
          </div>
          <div className="">
            <nav className="container text-regular text-xs lg:text-base">
              <ol className="list-reset py-4 pl-4 rounded flex bg-grey-light text-grey">
                <li className="px-2">
                  <div className="no-underline text-indigo capitalize">
                    <Link href="#">home</Link>
                  </div>
                </li>
                <li>/</li>
                <li className="px-2">
                  <div className="no-underline text-indigo capitalize">
                    <Link href="#">subcategory</Link>
                  </div>
                </li>
                <li>/</li>
                <li className="px-2 capitalize font-medium">add subcategory</li>
              </ol>
            </nav>
          </div>
        </div>
        <h1 className="text-center capitalize my-4 text-xl font-medium">
          add subcategory
        </h1>
        <Formik
          initialValues={{
            name: "",
            category: "",
            photos: [],
          }}
          onSubmit={async (values, actions) => {
            const response = await createSubcategory({
              variables: { ...values, photo: values.photos[0] || "" },
              update: (proxy, { data: { createSubcategory: newData } }) => {
                const data: any = proxy.readQuery({
                  query: GET_SUBCATEGORIES,
                });
                if (newData.subcategory) {
                  if (data) {
                    proxy.writeQuery({
                      query: GET_SUBCATEGORIES,
                      data: {
                        getSubcategories: [newData, ...data.getSubcategories],
                      },
                    });
                  }
                  setState({
                    ...state,
                    serverMessage: "Subcateogry added successfully",
                  });
                  router.push("/admin/subcategory");
                }
              },
            });
            if (response.data?.createSubcategory.errors) {
              let errorsMap: any = toErrorMap(
                response.data?.createSubcategory.errors
              );
              if (errorsMap.hasOwnProperty("error")) {
                setState({
                  ...state,
                  error: errorsMap.error,
                });
              }
              actions.setErrors(errorsMap);
            }
          }}
        >
          {({ values, isSubmitting, errors, setFieldValue, handleChange }) => (
            <>
              <div className="px-5">
                {state.serverMessage && (
                  <div className="bg-green-500 p-2 text-white font-semibold my-3 rounded">
                    {state.serverMessage}
                  </div>
                )}
                {state.error && (
                  <div className="bg-red-500 p-2 text-white font-semibold my-3 rounded">
                    {state.error}
                  </div>
                )}
              </div>
              <Form
                onClick={() => {
                  setState({ ...state, serverMessage: "", error: "" });
                }}
              >
                <div className="grid grid-cols-1 mx-5 gap-4 lg:grid-cols-2  lg:gap-8">
                  <div className="rounded bg-gray-50 shadow px-5 py-5">
                    {/* name */}
                    <ATextField
                      name="name"
                      type="text"
                      placeholder="Name"
                      label="Name"
                    />
                    <div className="relative inline-block w-full text-gray-700 ">
                      <Field
                        as="select"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full border"
                        placeholder="Regular input"
                        name="category"
                      >
                        <option value="">Select category</option>

                        {categories.map(({ category }) => (
                          <option value={category.id} key={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="category"
                        className="text-red-500"
                      />

                      {/* <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-nonee"></div> */}
                    </div>
                  </div>

                  <div className="rounded bg-gray-50 shadow px-5 py-5">
                    {/* photo */}
                    <ATextField
                      onChange={async (e) => {
                        let files = await convertToBase64(e.target.files);
                        setFieldValue("photos", files);
                      }}
                      name="photos"
                      multiple
                      type="file"
                      placeholder="Photo"
                      label="Photo"
                      // value={undefined}
                      value=""
                    />
                    {values.photos &&
                      values.photos.map((photo, i) => (
                        <div key={i}>
                          <img src={photo} />
                        </div>
                      ))}
                    <button
                      disabled={isSubmitting}
                      className="bg-green-500 text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 my-3"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      <div className="flex">
                        {isSubmitting && (
                          <div className="h-5 w-5 rounded-full border-dotted border-2  border-white animate-spin ease-linear mr-3"></div>
                        )}
                        <p>Submit</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
              </Form>
            </>
          )}
        </Formik>
      </div>
    </AdminLayout>
  );
};

export default withApollo({ ssr: true })(index);
