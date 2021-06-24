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
import FullPageLoading from "../../../../components/skeletonLoading/FullPageLoading";
import { GET_SUBCATEGORIES } from "../../../../graphql/queries/subcategoryQuery";
import { CREATE_PRODUCT } from "../../../../graphql/mutations/productMutation";
import { GET_PRODUCTS_BY_ADMIN } from "../../../../graphql/queries/productQuery";

const index = () => {
  const router = useRouter();
  const [state, setState] = useState({
    serverMessage: "",
    error: "",
  });
  // fetching subcategories
  const {
    loading: queryLoading,
    data: { getSubcategories: subcategories } = {},
  } = useQuery(GET_SUBCATEGORIES);
  // create product
  const [createProduct] = useMutation(CREATE_PRODUCT);

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
              product
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
                    <Link href="#">product</Link>
                  </div>
                </li>
                <li>/</li>
                <li className="px-2 capitalize font-medium">add product</li>
              </ol>
            </nav>
          </div>
        </div>
        <h1 className="text-center capitalize my-4 text-xl font-medium">
          add product
        </h1>
        <Formik
          initialValues={{
            name: "",
            photos: [],
            description: "",
            price: "",
            discountPrice: "",
            qty: "",
            unit: "",
            stock: "",
            subcategory: "",
          }}
          onSubmit={async (values, actions) => {
            const response = await createProduct({
              variables: { ...values, photo: values.photos[0] || "" },
              update: (proxy, { data: { createProduct: newData } }) => {
                const data: any = proxy.readQuery({
                  query: GET_PRODUCTS_BY_ADMIN,
                });
                if (newData.product) {
                  if (data) {
                    proxy.writeQuery({
                      query: GET_PRODUCTS_BY_ADMIN,
                      data: {
                        getProductsByAdmin: [
                          newData,
                          ...data.getProductsByAdmin,
                        ],
                      },
                    });
                  }
                  setState({
                    ...state,
                    serverMessage: "Product added successfully",
                  });
                  router.push("/admin/product");
                }
              },
            });
            if (response.data?.createProduct.errors) {
              let errorsMap: any = toErrorMap(
                response.data?.createProduct.errors
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
          {({ values, isSubmitting, errors, setFieldValue }) => (
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
                    {/* description */}
                    <ATextField
                      name="description"
                      type="text"
                      placeholder="Description"
                      label="Description"
                    />
                    {/* price */}
                    <ATextField
                      name="price"
                      type="text"
                      placeholder="Price"
                      label="Price"
                    />
                    {/* discountPrice */}
                    <ATextField
                      name="discountPrice"
                      type="text"
                      placeholder="Discount Price"
                      label="Discount Price"
                    />
                    {/* qty */}
                    <ATextField
                      name="qty"
                      type="text"
                      placeholder="Quantity"
                      label="Quantity"
                    />
                    {/* unit */}
                    <ATextField
                      name="unit"
                      type="text"
                      placeholder="Unit"
                      label="Unit"
                    />
                    {/* stock */}
                    <ATextField
                      name="stock"
                      type="text"
                      placeholder="Stock"
                      label="Stock"
                    />
                  </div>

                  <div className="rounded bg-gray-50 shadow px-5 py-5">
                    <div className="relative inline-block w-full text-gray-700 ">
                      <Field
                        as="select"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 relative 
                        bg-white rounded text-sm shadow outline-none focus:outline-none 
                        focus:shadow-outline w-full border"
                        placeholder="Regular input"
                        name="subcategory"
                      >
                        <option value="">Select subcategory</option>

                        {subcategories.map(({ subcategory }) => (
                          <option value={subcategory.id} key={subcategory.id}>
                            {subcategory.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="subcategory"
                        className="text-red-500"
                      />
                    </div>
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
                      className="bg-green-500 text-white active:bg-teal-600 font-bold
                       uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg
                        outline-none focus:outline-none mr-1 mb-1 my-3"
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
