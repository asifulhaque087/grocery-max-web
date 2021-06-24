import {
  cartItems,
  addToCart,
  decreaseItem,
  increaseItem,
} from "../../graphql/reactivities/cartVariable";
import Link from "next/link";
import { useReactiveVar } from "@apollo/client";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
const Product = (props) => {
  const cartProducts = useReactiveVar(cartItems);
  const { product } = props;
  const {
    id,
    name,
    photo,
    qty,
    unit,
    price,
    discountPrice,
    totalSell,
    persentage,
  } = product;
  const itemFound = cartProducts.find((ci) => ci.id === id);

  return (
    <>
      <div className="shadow-md">
        <Link href={`/product/${id}`}>
          <div className="rounded-tl rounded-tr shadow bg-gray-50n mb-1 relative cursor-pointer">
            <span
              className={`inline-block rounded-full text-white ${
                totalSell > 0 ? "bg-green-500" : "bg-yellow-500"
              } px-2 py-1 text-xs 
            font-bold mr-3 absolute top-3 left-2`}
            >
              {totalSell > 0 ? <span>{totalSell} sell</span> : "no sell"}
            </span>
            <div className="">
              <img
                src={`/images/${photo}`}
                height={1080}
                width={1920}
                alt="product"
                className=""
              />
            </div>
            <div className="py-2">
              <p className="text-center capitalize text-gray-500 text-xs py-3">
                {name}
              </p>
              <p className="text-center capitalize text-xs font-medium text-gray-700">
                {qty} {unit}
              </p>
              <p className="text-center py-2">
                <span className="font-bold text-green-500 text-xl">
                  ${price}
                </span>
                <span className="text-gray-300 font-medium  pl-3">
                  {persentage == "0.00" ? (
                    ""
                  ) : (
                    <>
                      <span className="line-through">${discountPrice}</span>
                      <span className="text-gray-400 text-xs">
                        ({persentage}%)
                      </span>
                    </>
                  )}
                </span>
              </p>
            </div>
          </div>
        </Link>
        {/* add to cart */}
        <div className="rounded-bl rounded-br shadow text-center border-t overflow-hidden">
          {itemFound ? (
            <div className="flex items-center font-medium justify-between text-sm cursor-pointer">
              <div className="bg-yellow-500 w-full py-2 grid place-items-center">
                <PlusIcon
                  onClick={() => increaseItem(itemFound)}
                  className="h-5 text-gray-700"
                />
              </div>
              <div className="bg-green-500 w-full py-2 grid place-items-center">
                {itemFound.count}
              </div>
              <div
                onClick={() => decreaseItem(itemFound)}
                className="bg-yellow-500 w-full py-2 grid place-items-center"
              >
                <MinusIcon className="h-5 text-gray-700" />
              </div>
            </div>
          ) : (
            <button
              className="capitalize text-sm text-green-500 font-medium py-2"
              onClick={() => addToCart(product)}
            >
              add to cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
