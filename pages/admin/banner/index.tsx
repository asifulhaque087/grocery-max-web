import Link from "next/link";
import moment from "moment";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/solid";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { withApollo } from "../../../graphql/client";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import TableLoading from "../../../components/skeletonLoading/TableLoading";
import { storeIdVar } from "../../../graphql/reactivities/storeIdVariable";
import { GET_BANNERS_BY_ADMIN } from "../../../graphql/queries/bannerQuery";
import { DELETE_BANNER } from "../../../graphql/mutations/bannerMutation";

const index = () => {
  const storeId = useReactiveVar(storeIdVar);
  // fetching banners
  const { loading: queryLoading, data: { getBannersByAdmin: banners } = {} } =
    useQuery(GET_BANNERS_BY_ADMIN);

  // deleting banner
  const [deleteBanner, { loading: mutationLoading }] =
    useMutation(DELETE_BANNER);

  return (
    <AdminLayout>
      {/* breadcum */}
      <div className="block sm:flex items-center justify-between px-5 bg-gray-50">
        <div>
          <h1 className="capitalize text-3xl font-medium text-center">
            banner
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
                <div className="no-underline text-indigo capitalize ">
                  <Link href="/admin">banner</Link>
                </div>
              </li>
              <li>/</li>
              <li className="px-2 capitalize font-medium">list banner</li>
            </ol>
          </nav>
        </div>
      </div>
      <h1 className="text-center text-gray-500 capitalize my-4 text-xl font-medium">
        list banner
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
                      Id
                    </th>
                    <th className="text-gray-600 dark:text-gray-400  pr-6  text-sm tracking-normal leading-4 font-medium">
                      Image
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
                  {banners &&
                    banners.map(({ banner }) => (
                      <tr
                        key={banner.id}
                        className="h-auto sm:h-24 border-gray-300 dark:border-gray-200 
                        border  sm:border-0 sm:border-b  align-middle text-center block sm:table-row my-10 sm:my-0"
                      >
                        <td
                          className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell text-right sm:text-center relative py-10 sm:py-0 border-b sm:border-b-0"
                          data-label="Id"
                        >
                          {banner.id}
                        </td>
                        <td
                          className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell text-right sm:text-right relative py-10 sm:py-0 border-b sm:border-b-0"
                          data-label="Image"
                        >
                          <img
                            src={`/images/${banner.photo}`}
                            alt="banner"
                            className="w-16  overflow-hidden shadow block ml-auto md:m-auto"
                          />
                        </td>
                        <td
                          className="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 block sm:table-cell
                        text-right sm:text-center relative    py-10 sm:py-0 border-b sm:border-b-0"
                          data-label="Date"
                        >
                          {/* { new Date( banner. createdAt) } */}
                          {moment
                            .unix(banner.createdAt)
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
                                storeIdVar(banner.id);
                                await deleteBanner({
                                  variables: { id: banner.id },
                                  update: (proxy) => {
                                    proxy.evict({
                                      id: `Banner:${banner.id}`,
                                    });
                                  },
                                });
                              }
                            }}
                          >
                            <TrashIcon
                              className={`h-5 text-red-500 ${
                                mutationLoading &&
                                banner.id == storeId &&
                                "animate-spin"
                              }`}
                            />
                          </button>
                          <Link href={`/admin/banner/edit/${banner.id}`}>
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
