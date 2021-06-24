import Link from "next/link";
import {
  MenuIcon,
  QuestionMarkCircleIcon,
  UserIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { LoginIcon, LogoutIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { userSideDrawerVar } from "../../graphql/reactivities/toogleVariable";
import { loggedInUserVar } from "../../graphql/reactivities/userVariable";
import { useQuery, useReactiveVar } from "@apollo/client";
import { withApollo } from "../../graphql/client";
import { GET_KEYWORD_PRODUCTS } from "../../graphql/queries/productQuery";
import { useState } from "react";
import { useRouter } from "next/router";
const Dtopbar = () => {
  const router = useRouter();
  const loggedInUser: any = useReactiveVar(loggedInUserVar);
  const [state, setState] = useState({
    searchedData: [],
    key: "",
  });

  // fetching keyword products
  const {
    loading: keywordLoading,
    data: { getKeywordProducts: keywordProducts } = {},
    fetchMore,
  } = useQuery(GET_KEYWORD_PRODUCTS, {
    variables: {
      keyword: "",
    },
    fetchPolicy: "network-only",
  });

  // const [getKeywordProducts] = useQuery(GET_KEYWORD_PRODUCTS);
  // const [loading, getKeywordProducts] = useQuery(GET_KEYWORD_PRODUCTS);

  return (
    <>
      <div className="fixed w-full bg-white z-10">
        <div className=" h-14 flex items-center  shadow">
          {/* hamberger icon */}
          <div
            className="px-2 md:px-4 cursor-pointer"
            onClick={() => userSideDrawerVar(!userSideDrawerVar())}
          >
            <MenuIcon className="h-7" />
          </div>
          {/* the logo */}
          <div className="cursor-pointer">
            <Link href="/">
              <div>
                <Image src="/pumpkinLogo.png" height={50} width={50} />
              </div>
            </Link>
          </div>
          {/* search box */}
          <div className="flex-grow px-2 md:px-4">
            <input
              onChange={async (e) => {
                if (e.target.value) {
                  const commingProducts = await fetchMore({
                    variables: {
                      keyword: e.target.value,
                    },
                  });
                  setState({
                    ...state,
                    searchedData: commingProducts.data.getKeywordProducts,
                  });
                  // console.log(commingProducts);
                } else {
                  setState({ ...state, searchedData: [] });
                }
              }}
              type="text"
              placeholder="Search for products (e.g. eggs, milk, potato)"
              className="border p-2 focus:outline-none rounded w-full"
            />
          </div>
          {/* admin panel */}
          <div>
            <div className="font-medium cursor-pointer">
              <Link href="/admin" prefetch={false}>
                <div className="flex">
                  <UserIcon className="h-7 text-yellow-500" />
                  <span className="whitespace-nowrap hidden sm:inline">
                    Admin Panel
                  </span>
                </div>
              </Link>
            </div>
          </div>
          {/* Profile */}
          {typeof window !== "undefined" && loggedInUser && (
            <div className="px-2 md:px-4">
              <div className="font-medium cursor-pointer">
                <Link href={`/profile`} prefetch={false}>
                  <div className="flex">
                    <UserCircleIcon className="h-7 text-yellow-500" />
                    <span className="whitespace-nowrap hidden sm:inline">
                      Profile
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          )}
          {/* help and more */}
          <div className="px-2 md:px-4 hidden sm:inline">
            <div className="font-medium cursor-pointer">
              <Link href="/help" prefetch={false}>
                <div className="flex">
                  <QuestionMarkCircleIcon className="h-7 text-yellow-500" />
                  <span className="whitespace-nowrap hidden sm:inline">
                    Help
                  </span>
                </div>
              </Link>
            </div>
          </div>
          {/* sign in  */}
          <div className=" px-2 md:px-4">
            <div className="font-medium cursor-pointer">
              {typeof window !== "undefined" && loggedInUser ? (
                <div>
                  <div
                    className="flex"
                    onClick={() => {
                      sessionStorage.removeItem("jwtToken");
                      loggedInUserVar(null);
                      router.push("/");

                    }}
                  >
                    <LogoutIcon className="h-7 text-yellow-500" />
                    <span className="whitespace-nowrap hidden sm:inline">
                      Sign out
                    </span>
                  </div>
                </div>
              ) : (
                <Link href="/login" prefetch={false}>
                  <div className="flex">
                    <LoginIcon className="h-7 text-yellow-500" />
                    <span className="whitespace-nowrap hidden sm:inline">
                      Sign in
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-14"></div>
      {state.searchedData.length > 0 && (
        <div
          onClick={(e) => setState({ ...state, searchedData: [], key: "" })}
          className=" text-black bg-[rgba(0,0,0,0.5)]   fixed z-20  w-full h-screen grid
       place-items-center"
        >
          <div className=" w-5/6 sm:w-1/2 rounded overflow-hidden">
            {keywordLoading ? (
              "loading"
            ) : (
              <>
                {state.searchedData.map((product) => (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    key={product.id}
                    className="flex items-center border-b bg-white px-5 py-1"
                  >
                    <div>
                      <img src={`/images/${product.photo}`} width="60" alt="" />
                    </div>
                    <div className="px-5">
                      <div className="text-gray-600 ">{product.name}</div>
                      <div className="text-xs font-medium text-gray-500">
                        $ {product.price}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default withApollo({ ssr: false })(Dtopbar);
