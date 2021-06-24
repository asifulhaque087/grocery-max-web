import AdminLayout from "../../layouts/admin/AdminLayout";
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import Link from "next/link";

const index = () => {
  return (
    <AdminLayout>
      <div>
        {/* breadcum */}
        <div className="block sm:flex items-center justify-between px-5 bg-gray-50">
          <div>
            <h1 className="capitalize text-3xl font-medium text-center">
              Home
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
              </ol>
            </nav>
          </div>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 p-10">
          <div className="p-5 bg-gray-50 border rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 font-medium uppercase text-xs">
                  user
                </p>
                <h1 className="font-medium text-lg">293843</h1>
              </div>
              <div>
                <CurrencyDollarIcon className="h-10 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="p-5 bg-gray-50 border rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 font-medium uppercase text-xs">
                  user
                </p>
                <h1 className="font-medium text-lg">293843</h1>
              </div>
              <div>
                <CurrencyDollarIcon className="h-10 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="p-5 bg-gray-50 border rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 font-medium uppercase text-xs">
                  user
                </p>
                <h1 className="font-medium text-lg">293843</h1>
              </div>
              <div>
                <CurrencyDollarIcon className="h-10 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="p-5 bg-gray-50 border rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 font-medium uppercase text-xs">
                  user
                </p>
                <h1 className="font-medium text-lg">293843</h1>
              </div>
              <div>
                <CurrencyDollarIcon className="h-10 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* graph photo part */}
        <div className="px-10">
          <div className="rounded-lg overflow-hidden border bg-gray-50">
            <div className="border-t my-20">
              <img src="/aGraph.jpg" className="w-full" alt="" />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default index;
