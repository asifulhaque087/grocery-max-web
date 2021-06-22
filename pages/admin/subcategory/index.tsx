import Link from "next/link";
import moment from "moment";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/solid";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { withApollo } from "../../../graphql/client";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { GET_SUBCATEGORIES } from "../../../graphql/queries/subcategoryQuery";
import { DELETE_SUBCATEGORY } from "../../../graphql/mutations/subcategoryMutation";
import TableLoading from "../../../components/skeletonLoading/TableLoading";
import { storeIdVar } from "../../../graphql/reactivities/storeIdVariable";

const index = () => {
  const storeId = useReactiveVar(storeIdVar);
  const {
    loading: queryLoading,
    data: { getSubcategories: subcategories } = {},
  } = useQuery(GET_SUBCATEGORIES);
  const [deleteSubcategory, { loading: mutationLoading }] =
    useMutation(DELETE_SUBCATEGORY);

  return (
    <AdminLayout>
      {/* breadcum */}
      <div className="block sm:flex items-center justify-between px-5 bg-gray-50">
        <div>
          <h1 className="capitalize text-3xl font-medium text-center">
            subcategory
          </h1>
        </div>
        <div className="">
          <nav className="container text-regular text-xs lg:text-base">
            <ol className="list-reset py-4  rounded flex items-center justify-center sm:justify-start bg-grey-light text-grey">
              <li className="px-2">
                <div className="no-underline text-indigo capitalize">
                  <Link href="/admin">home</Link>
                </div>
              </li>
              <li>/</li>
              <li className="px-2">
                <div className="no-underline text-indigo capitalize">
                  <Link href="/admin">subcategory</Link>
                </div>
              </li>
              <li>/</li>
              <li className="px-2 capitalize font-medium">subcategory list </li>
            </ol>
          </nav>
        </div>
      </div>
      <h1 className="text-center text-gray-500 capitalize my-4 text-xl font-medium">
        subcategory list
      </h1>
      <div className="px-5">
        <div className="mx-auto container bg-white dark:bg-gray-800 shadow-none sm:shadow rounded ">
          <div className="w-full  xl:overflow-x-hidden">
            {queryLoading ? (
              <div>
                <TableLoading />
              </div>
            ) : (
              <table className="min-w-full bg-white dark:bg-gray-800 block sm:table">
                <thead className="hidden sm:table-header-group">
                  <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8 align-middle text-center">
                    <th className="text-gray-600 dark:text-gray-400  pr-6  text-sm tracking-normal leading-4 font-medium">
                      Name
                    </th>
                    <th className="text-gray-600 dark:text-gray-400  pr-6  text-sm tracking-normal leading-4 font-medium">
                      Image
                    </th>
                    <th className="text-gray-600 dark:text-gray-400  pr-6  text-sm tracking-normal leading-4 font-medium">
                      Category
                    </th>
                    <th className="text-gray-600 dark:text-gray-400  pr-6  text-sm tracking-normal leading-4 font-medium">
                      Date
                    </th>
                    <td className="text-gray-600 dark:text-gray-400  pr-8  text-sm tracking-normal leading-4 font-medium">
                      Action
                    </td>
                  </tr>
                </thead>

                <tbody className="block sm:table-row-group">
                  {subcategories &&
                    subcategories.map(({ subcategory }) => (
                      <tr
                        key={subcategory.id}
                        className="h-auto sm:h-24 border-gray-300 dark:border-gray-200 
                        border  sm:border-0 sm:border-b  align-middle text-center block sm:table-row my-10 sm:my-0"
                      >
                        <td
                          className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell text-right sm:text-center relative py-10 sm:py-0 border-b sm:border-b-0"
                          data-label="Name"
                        >
                          {subcategory.name}
                        </td>

                        <td
                          className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell text-right sm:text-right relative py-10 sm:py-0 border-b sm:border-b-0"
                          data-label="Image"
                        >
                          <img
                            src={`/images/${subcategory.photo}`}
                            alt="subcategory"
                            className="w-16  overflow-hidden shadow block ml-auto md:m-auto"
                          />
                        </td>

                        <td
                          className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell text-right sm:text-center relative py-10 sm:py-0 border-b sm:border-b-0"
                          data-label="Category"
                        >
                          {subcategory.category && subcategory.category.name}
                        </td>

                        <td
                          className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell
                        text-right sm:text-center relative    py-10 sm:py-0 border-b sm:border-b-0"
                          data-label="Date"
                        >
                          {/* { new Date( subcategory. createdAt) } */}
                          {moment
                            .unix(subcategory.createdAt)
                            .subtract(10, "days")
                            .calendar()}
                        </td>

                        <td
                          className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell
                        text-right sm:text-center relative py-10 sm:py-0 border-b sm:border-b-0"
                          data-label="Action"
                        >
                          <button
                            className="mr-2"
                            onClick={async () => {
                              if (window.confirm("Are you sure ?") == true) {
                                storeIdVar(subcategory.id);
                                await deleteSubcategory({
                                  variables: { id: subcategory.id },
                                  update: (proxy) => {
                                    proxy.evict({
                                      id: `Subcategory:${subcategory.id}`,
                                    });
                                  },
                                });
                              }
                            }}
                          >
                            <TrashIcon
                              className={`h-5 text-red-500 ${
                                mutationLoading &&
                                subcategory.id == storeId &&
                                "animate-spin"
                              }`}
                            />
                          </button>
                          <Link
                            href={`/admin/subcategory/edit/${subcategory.id}`}
                          >
                            <button className="ml-2">
                              <PencilAltIcon className="h-5 text-yellow-500" />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withApollo({ ssr: false })(index);
