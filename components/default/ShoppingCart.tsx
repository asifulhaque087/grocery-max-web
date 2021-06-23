import Link from "next/link";
import { useReactiveVar } from "@apollo/client";
import { withApollo } from "../../graphql/client";
import {
  ShoppingBagIcon,
  XIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { motion, AnimatePresence } from "framer-motion";
import {
  cartAllPrices,
  cartItems,
  clearCart,
  decreaseItem,
  increaseItem,
  removeToCart,
} from "../../graphql/reactivities/cartVariable";
import React, { useState } from "react";
const ShoppingCart = () => {
  const cartProducts = useReactiveVar(cartItems);
  const { cartItemsPrice, shippingPrice, taxPrice, totalPrice } =
    cartAllPrices();

  const [state, setState] = useState({
    open: false,
  });

  if (!state.open) {
    return (
      <>
        <div
          //   initial={{ x: "100vw", y: 0 }}
          //   animate={{
          //     x: 0,
          //     y: 0,
          //   }}
          //   exit={{
          //     x: "-100%",
          //   }}
          className="fixed right-0 top-[43%]  rounded-md border overflow-hidden  shadow-md text-yellow-400 cursor-pointer z-10"
          onClick={() => setState({ ...state, open: true })}
        >
          <div className=" bg-transparent">
            <div className="bg-gray-500 bg-opacity-70 hover:bg-opacity-100 transition p-2">
              <div>
                <ShoppingBagIcon className="h-5 m-auto" />
              </div>
              <p className="uppercase text-center">
                {cartProducts.length} items
              </p>
            </div>
            <div className="bg-gray-50 bg-opacity-70 hover:bg-opacity-100 transition">
              <p className="uppercase text-center">
                {cartItemsPrice ? cartItemsPrice : 0}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <AnimatePresence>
      {state.open && (
        <>
          <motion.div
            initial={{ x: "100vw", y: 0 }}
            animate={{
              x: 0,
              y: 0,
            }}
            exit={{
              x: "-100%",
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.9 }}
            className="fixed top-0 right-0 bottom-0 h-screen  mt-14 w-72 shadow bg-white z-20"
          >
            <div className="h-[81%] overflow-x-hidden overflow-y-auto">
              <ul>
                {cartProducts.map((product) => (
                  <div
                    key={product.id}
                    className="h-16 border-b flex items-center px-4"
                  >
                    <div className="flex flex-col items-center">
                      <div onClick={() => increaseItem(product)}>
                        <ChevronUpIcon className="h-5 text-gray-300 cursor-pointer" />
                      </div>
                      <div>{product.count}</div>
                      <div onClick={() => decreaseItem(product)}>
                        <ChevronDownIcon className="h-5 text-gray-300 cursor-pointer" />
                      </div>
                    </div>
                    <div className="flex items-center px-5 flex-grow">
                      <div>
                        <img
                          src={`/images/${product.photo}`}
                          alt="product"
                          width={40}
                        />
                      </div>
                      <div className="flex-grow px-3 ">
                        <p className="text-sm">{product.name}</p>
                        <p className="text-xs text-gray-400">
                          $ {product.price} / {product.qty} {product.unit}
                        </p>
                      </div>
                      <div className="text-gray-700 text-sm font-medium">
                        ${product.price * product.count}
                      </div>
                    </div>
                    <div onClick={() => removeToCart(product)}>
                      <XIcon className="h-5 text-red-400 cursor-pointer" />
                    </div>
                  </div>
                ))}
              </ul>
            </div>
            <div
              className="bg-white border-t shadow rounded w-full h-[20%] font-bold 
            absolute left-0 bottom-0 right-0 
            mb-14 grid place-items-center"
            >
              <Link href="/shipping-info">
                <div className="flex items-center justify-center rounded overflow-hidden cursor-pointer">
                  <div>
                    <div className="p-3 bg-yellow-400">Place Order</div>
                  </div>
                  <div className="p-3 bg-yellow-300">$ {cartItemsPrice}</div>
                </div>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
            onClick={() => setState({ ...state, open: false })}
            className="bg-[rgba(0,0,0,0.5)] mt-14 px-5 fixed h-full w-full flex items-center justify-center top-0 right-0  z-10"
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default withApollo({ ssr: false })(ShoppingCart);
