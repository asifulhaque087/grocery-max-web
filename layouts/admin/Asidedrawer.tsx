import Link from "next/link";
import { useReactiveVar } from "@apollo/client";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { withApollo } from "../../graphql/client";
import { userSideDrawerVar } from "../../graphql/reactivities/toogleVariable";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Asidedrawer = () => {
  const [state, setState] = useState({
    colors: ["red", "indigo", "green", "yellow", "blue", "purple"],
    urls: [
      {
        name: "home",
        icon: "",
        to: "/admin",
        childrens: [],
        open: false,
      },
      {
        name: "banner",
        icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
        // to: "",
        childrens: [
          {
            name: "add banner",
            to: "/admin/banner/add",
          },
          {
            name: "list banner",
            to: "/admin/banner",
          },
        ],
        open: false,
      },
      {
        name: "category",
        icon: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
        // to: "",
        childrens: [
          {
            name: "add category",
            to: "/admin/category/add",
          },
          {
            name: "list category",
            to: "/admin/category",
          },
        ],
        open: false,
      },
      {
        name: "subcategory",
        icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
        // to: "",
        childrens: [
          {
            name: "add subcategory",
            to: "/admin/subcategory/add",
          },
          {
            name: "list subcategory",
            to: "/admin/subcategory",
          },
        ],
        open: false,
      },
      {
        name: "product",
        icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
        // to: "",
        childrens: [
          {
            name: "add product",
            to: "/admin/product/add",
          },
          {
            name: "list product",
            to: "/admin/product",
          },
        ],
        open: false,
      },
      {
        name: "order",
        to: "/admin/order",
        icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
        open: false,
      },
    ],
  });
  const userSideDrawer = useReactiveVar(userSideDrawerVar);

  useEffect(() => {
    function updateSize() {
      if (innerWidth <= 767) {
        userSideDrawerVar(false);
      }

      if (innerWidth >= 768) {
        userSideDrawerVar(true);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const BigSreen = {
    show: {
      x: 0,
    },
    hidden: {
      x: -100,
    },
  };

  const toggleUrl = (index) => {
    setState({
      ...state,
      urls: state.urls.map((url, i) => {
        if (i === index) {
          url.open = !url.open;
        } else {
          url.open = false;
        }

        return url;
      }),
    });
  };

  return (
    <AnimatePresence>
      {userSideDrawer && (
        <>
          <motion.div
            initial="hidden"
            animate="show"
            exit={{
              x: "-100%",
            }}
            variants={BigSreen}
            className={`mt-14 fixed inset-y-0 left-0 z-10`}
          >
            <div className=" h-screen  w-64 border-r bg-white ">
              <div className="h-full overflow-x-hidden overflow-y-auto">
                <AnimateSharedLayout>
                  <motion.ul layout>
                    {state.urls &&
                      state.urls.map((url, i) => (
                        <div key={i}>
                          <motion.li
                            layout
                            whileHover={{
                              backgroundColor: "rgba(255,153,51,.5)",
                              transition: { duration: 1 },
                            }}
                            onClick={() => toggleUrl(i)}
                            className="mx-1 rounded  capitalize text-sm cursor-pointer py-2"
                          >
                            <Link
                              href={`${url.hasOwnProperty("to") ? url.to : ""}`}
                            >
                              <div className=" py-1 px-2 w-full flex items-center">
                                <span>
                                  <HomeIcon
                                    className={`h-5 mr-3 text-${
                                      state.colors[
                                        Math.floor(
                                          Math.random() * state.colors.length
                                        )
                                      ]
                                    }-600`}
                                  />
                                </span>
                                <span className="mr-auto font-medium text-gray-800">
                                  {url.name}
                                </span>
                                {!url.hasOwnProperty("to") && (
                                  <span>
                                    <ChevronRightIcon className="h-3 mr-3 text-gray-500" />
                                  </span>
                                )}
                              </div>
                            </Link>
                          </motion.li>
                          <AnimatePresence>
                            {url.childrens &&
                              url.open &&
                              url.childrens.map((child, i) => {
                                return (
                                  <motion.div
                                    layout
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    whileHover={{
                                      backgroundColor: "rgba(255,153,51,.5)",
                                      margin: "0 10px",
                                      borderRadius: "10px",
                                      transition: { duration: 1 },
                                    }}
                                    className="border-l-4 border-green-700"
                                  >
                                    <Link href={`${child.to}`} prefetch={false}>
                                      <div
                                        onClick={(e) => e.stopPropagation()}
                                        className="pl-14 py-2 cursor-pointer"
                                      >
                                        {child.name}
                                      </div>
                                    </Link>
                                  </motion.div>
                                );
                              })}
                          </AnimatePresence>
                        </div>
                      ))}
                  </motion.ul>
                </AnimateSharedLayout>
              </div>
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
            onClick={() => userSideDrawerVar(!userSideDrawerVar())}
            className="bg-[rgba(0,0,0,0.5)] mt-14 px-5 fixed h-full w-full flex items-center justify-center top-0 left-0  md:hidden"
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default withApollo({ ssr: false })(Asidedrawer);

// visible: (i) => ({
//   opacity: 1,
//   transition: {
//     delay: i * 0.3,
//   },
// }),
