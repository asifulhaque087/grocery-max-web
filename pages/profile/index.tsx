import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { TrashIcon, PencilAltIcon, EyeIcon } from "@heroicons/react/solid";
import Link from "next/link";

import moment from "moment";

import { withApollo } from "../../graphql/client";
import { GET_USER_TO_ORDER } from "../../graphql/queries/orderQuery";
import DefaultLayout from "../../layouts/default/DefaultLayout";
import TableLoading from "../../components/skeletonLoading/TableLoading";
import userAuth from "../../auths/userAuth";
import { storeIdVar } from "../../graphql/reactivities/storeIdVariable";
import { DELETE_ORDER_BY_USER } from "../../graphql/mutations/orderMutation";
import { loggedInUserVar } from "../../graphql/reactivities/userVariable";

const index = () => {
  const loggedInUser: any = useReactiveVar(loggedInUserVar);
  const storeId = useReactiveVar(storeIdVar);
  // fetching orders by id
  const { loading, data: { getUserToOrder: orders } = {} } =
    useQuery(GET_USER_TO_ORDER);

  const [deleteOrderByUser, { loading: mutationLoading }] =
    useMutation(DELETE_ORDER_BY_USER);

  return (
    <DefaultLayout>
      <h1 className="text-center text-gray-500 capitalize my-4 text-xl font-medium">
        {" "}
        {loggedInUser.name}{" "}
      </h1>
      <h1 className="text-center text-gray-500 capitalize my-4 text-xl font-medium">
        list order
      </h1>
      <div className="px-5">
        <div className="mx-auto container bg-white dark:bg-gray-800 shadow-none sm:shadow rounded ">
          <div className="w-full  xl:overflow-x-hidden">
            {loading ? (
              <div>
                <TableLoading />
              </div>
            ) : (
              <table className="min-w-full bg-white dark:bg-gray-800 block sm:table">
                <thead className="hidden sm:table-header-group">
                  <tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8 align-middle text-center">
                    <th className="text-gray-600 dark:text-gray-400  pr-6  text-sm tracking-normal leading-4 font-medium">
                      Id
                    </th>
                    <th className="text-gray-600 dark:text-gray-400  pr-6  text-sm tracking-normal leading-4 font-medium">
                      Date
                    </th>
                    <th className="text-gray-600 dark:text-gray-400  pr-6  text-sm tracking-normal leading-4 font-medium">
                      Paid
                    </th>
                    <th className="text-gray-600 dark:text-gray-400  pr-6  text-sm tracking-normal leading-4 font-medium">
                      Delivered
                    </th>
                    <td className="text-gray-600 dark:text-gray-400  pr-8  text-sm tracking-normal leading-4 font-medium">
                      Action
                    </td>
                  </tr>
                </thead>
                <tbody className="block sm:table-row-group">
                  {orders &&
                    orders.map((order) => (
                      <tr
                        key={order.id}
                        className="h-auto sm:h-24 border-gray-300 dark:border-gray-200 
                        border  sm:border-0 sm:border-b  align-middle text-center block sm:table-row my-10 sm:my-0"
                      >
                        <td
                          className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell text-right sm:text-center relative py-10 sm:py-0 border-b sm:border-b-0"
                          data-label="Id"
                        >
                          {order.id}
                        </td>

                        <td
                          className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell
                        text-right sm:text-center relative    py-10 sm:py-0 border-b sm:border-b-0"
                          data-label="Date"
                        >
                          {/* { new Date( order. createdAt) } */}
                          {moment
                            .unix(order.createdAt)
                            .subtract(10, "days")
                            .calendar()}
                        </td>
                        <td
                          className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell text-right sm:text-center relative py-10 sm:py-0 border-b sm:border-b-0"
                          data-label="Delivered"
                        >
                          {order.isPaid ? "Paid" : "Not Paid"}
                        </td>
                        <td
                          className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell text-right sm:text-center relative py-10 sm:py-0 border-b sm:border-b-0"
                          data-label="Paid"
                        >
                          {order.isDelivered ? "Delivered" : "Not Delivered"}
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
                                storeIdVar(order.id);
                                await deleteOrderByUser({
                                  variables: { id: order.id },
                                  update: (proxy) => {
                                    proxy.evict({
                                      id: `Order:${order.id}`,
                                    });
                                  },
                                });
                              }
                            }}
                          >
                            <TrashIcon
                              className={`h-5 text-red-500 ${
                                mutationLoading &&
                                order.id == storeId &&
                                "animate-spin"
                              }`}
                            />
                          </button>
                          <Link href={`/order/${order.id}`}>
                            <button className="ml-2">
                              <EyeIcon className="h-5 text-yellow-500" />
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
    </DefaultLayout>
  );
};

export default withApollo({ ssr: false })(userAuth(index));
