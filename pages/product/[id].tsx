import DefaultLayout from "../../layouts/default/DefaultLayout";

import Footer from "../../components/default/Footer";
import { withApollo } from "../../graphql/client";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import React from "react";
import { GET_PRODUCT_DETAILS } from "../../graphql/queries/productQuery";
import { useRouter } from "next/router";
import { useQuery, useReactiveVar } from "@apollo/client";
import FullPageLoading from "../../components/skeletonLoading/FullPageLoading";
import {
  cartItems,
  addToCart,
  decreaseItem,
  increaseItem,
} from "../../graphql/reactivities/cartVariable";
import ShoppingCart from "../../components/default/ShoppingCart";

const index = (props) => {
  const router = useRouter();

  const cartProducts = useReactiveVar(cartItems);
  // fetching product by id
  const { loading, data: { getProductDetails: product } = {} } = useQuery(
    GET_PRODUCT_DETAILS,
    {
      variables: {
        id: router.query.id,
      },
    }
  );

  if (loading) {
    return <FullPageLoading />;
  }

  const itemFound = cartProducts.find((ci) => ci.id === product.id);
  console.log(itemFound);

  return (
    <DefaultLayout>
      <ShoppingCart {...props} />
      <div>
        <div className="grid md:grid-cols-2 px-7 py-20">
          {/* left */}
          <div className="border rounded overflow-hidden flex items-center justify-center w-full max-w-xs">
            <img
              src={`/images/${product.photo}`}
              alt="product"
              className="w-full "
            />
          </div>
          {/* right */}
          <div className="md:pl-7">
            <div className="text-center sm:text-left">
              <p className="font-medium text-gray-500 text-md py-2">
                {product.name}
              </p>
              <p className=" text-gray-500 text-xs py-2">200 gm</p>
              <h1 className="font-bold text-gray-500 text-xl py-2">$100</h1>
            </div>
            <div className="flex items-center w-full   rounded shadow border font-bold text-xl md:w-[60%]">
              <div
                onClick={() => {
                  itemFound ? increaseItem(itemFound) : addToCart(product);
                }}
                className="bg-gray-200 p-5 cursor-pointer"
              >
                <PlusIcon className="h-5" />{" "}
              </div>
              <div className="flex-grow text-center text-gray-600">
                {itemFound ? itemFound.count : 0}
              </div>
              <div
                onClick={() => itemFound && decreaseItem(itemFound)}
                className="bg-gray-200 p-5 cursor-pointer"
              >
                <MinusIcon className="h-5" />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </DefaultLayout>
  );
};

export default withApollo({ ssr: true })(index);
