import { useRouter } from "next/router";
import Link from "next/link";

import { Formik, Form } from "formik";
import { CREATE_BANNER } from "../../../../graphql/mutations/bannerMutation";
import { useMutation } from "@apollo/client";
import { toErrorMap } from "../../../../utils/toErrorMap";
import { withApollo } from "../../../../graphql/client";
import { useState } from "react";
import ATextField from "../../../../components/forms/admin/ATextField";
import AdminLayout from "../../../../layouts/admin/AdminLayout";
import { convertToBase64 } from "../../../../utils/convertToBase64";
import { GET_BANNERS_BY_ADMIN } from "../../../../graphql/queries/bannerQuery";

const index = () => {
  const [state, setState] = useState({
    serverMessage: "",
    error: "",
  });
  const router = useRouter();
  const [createBanner] = useMutation(CREATE_BANNER);

  return (
    <AdminLayout>
      <div>
        {/* breadcum */}
        <div className="block md:flex items-center justify-between px-5 bg-gray-50 shadow">
          <div>
            <h1 className="capitalize text-3xl font-medium text-center">
              banner
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
                    <Link href="#">banner</Link>
                  </div>
                </li>
                <li>/</li>
                <li className="px-2 capitalize font-medium">add banner</li>
              </ol>
            </nav>
          </div>
        </div>
        <h1 className="text-center capitalize my-4 text-xl font-medium">
          add banner
        </h1>
        <Formik
          initialValues={{
            photos: [],
          }}
          onSubmit={async (values, actions) => {
            const response = await createBanner({
              variables: { ...values, photo: values.photos[0] || "" },
              update: (proxy, { data: { createBanner: newData } }) => {
                const data: any = proxy.readQuery({
                  query: GET_BANNERS_BY_ADMIN,
                });
                if (newData.banner) {
                  if (data) {
                    proxy.writeQuery({
                      query: GET_BANNERS_BY_ADMIN,
                      data: {
                        getBannersByAdmin: [newData, ...data.getBannersByAdmin],
                      },
                    });
                  }
                  setState({
                    ...state,
                    serverMessage: "Banner added successfully",
                  });
                  router.push("/admin/banner");
                }
              },
            });
            if (response.data?.createBanner.errors) {
              let errorsMap: any = toErrorMap(
                response.data?.createBanner.errors
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
                      uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 my-3"
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
              </Form>
            </>
          )}
        </Formik>
      </div>
    </AdminLayout>
  );
};

export default withApollo({ ssr: true })(index);
