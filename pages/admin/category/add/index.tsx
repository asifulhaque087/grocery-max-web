import { useRouter } from "next/router";
import Link from "next/link";

import { Formik, Form } from "formik";
import { CREATE_CATEGORY } from "../../../../graphql/mutations/categoryMutation";
import { useMutation } from "@apollo/client";
import { toErrorMap } from "../../../../utils/toErrorMap";
import { withApollo } from "../../../../graphql/client";
import { useState } from "react";
import ATextField from "../../../../components/forms/admin/ATextField";
import AdminLayout from "../../../../layouts/admin/AdminLayout";
import { convertToBase64 } from "../../../../utils/convertToBase64";
import { GET_CATEGORIES_BY_ADMIN } from "../../../../graphql/queries/categoryQuery";

const index = () => {
  const [state, setState] = useState({
    serverMessage: "",
    error: "",
  });
  const router = useRouter();
  const [createCategory] = useMutation(CREATE_CATEGORY);

  return (
    <AdminLayout>
      <div>
        {/* breadcum */}
        <div className="block md:flex items-center justify-between px-5 bg-gray-50 shadow">
          <div>
            <h1 className="capitalize text-3xl font-medium text-center">
              category
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
                    <Link href="#">category</Link>
                  </div>
                </li>
                <li>/</li>
                <li className="px-2 capitalize font-medium">add category</li>
              </ol>
            </nav>
          </div>
        </div>
        <h1 className="text-center capitalize my-4 text-xl font-medium">
          add category
        </h1>
        <Formik
          initialValues={{
            name: "",
            photos: [],
          }}
          onSubmit={async (values, actions) => {
            const response = await createCategory({
              variables: { ...values, photo: values.photos[0] || "" },
              update: (proxy, { data: { createCategory: newCategory } }) => {
                const data: any = proxy.readQuery({
                  query: GET_CATEGORIES_BY_ADMIN,
                });
                if (newCategory.category) {
                  if (data) {
                    proxy.writeQuery({
                      query: GET_CATEGORIES_BY_ADMIN,
                      data: {
                        getCategoriesByAdmin: [
                          newCategory,
                          ...data.getCategoriesByAdmin,
                        ],
                      },
                    });
                  }
                  setState({
                    ...state,
                    serverMessage: "Cateogry added successfully",
                  });
                  router.push("/admin/category");
                }
                // if (data) {
                //   proxy.writeQuery({
                //     query: GET_CATEGORIES,
                //     data: {
                //       getCategories: [newCategory, ...data.getCategories],
                //     },
                //   });
                // }

                // setState({
                //   ...state,
                //   serverMessage: "Category Added Successfully",
                // });
              },
            });
            if (response.data?.createCategory.errors) {
              let errorsMap: any = toErrorMap(
                response.data?.createCategory.errors
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

{
  /* <AauthTextField
name="name"
type="text"
placeholder="Name"
label="Name"
/> */
}

{
  /* <div>
  <input
    onChange={async (e) => {
      let files = await convertToBase64(e.target.files);
      setFieldValue("photos", files);
    }}
    name="photos"
    multiple
    type="file"
    placeholder="Photo"
  />
  {values.photos &&
    values.photos.map((photo, i) => (
      <div key={i}>
        <img src={photo} width="50" />
      </div>
    ))}
</div>; */
}

// if (newCategory.category) {
//   if (data) {
//     proxy.writeQuery({
//       query: GET_CATEGORIES,
//       data: {
//         getCategories: [
//           newCategory.category,
//           ...data.getCategories,
//         ],
//       },
//     });
//   }
//   setState({
//     ...state,
//     serverMessage: "Cateogry added successfully",
//   });

// }
