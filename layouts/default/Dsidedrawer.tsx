import Link from "next/link";
import { useQuery, useReactiveVar } from "@apollo/client";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { withApollo } from "../../graphql/client";
import { GET_CATEGORIES } from "../../graphql/queries/categoryQuery";
import { userSideDrawerVar } from "../../graphql/reactivities/toogleVariable";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Dsidedrawer = () => {
  const [state, setState] = useState({
    categories: [],
  });
  // fetching category
  let { loading, data: { getCategories } = {} } = useQuery(GET_CATEGORIES);
  const userSideDrawer = useReactiveVar(userSideDrawerVar);

  useEffect(() => {
    let newCats = [];

    if (getCategories) {
      for (let cat of getCategories) {
        newCats.push({ ...cat, isOpen: false });
      }
    }
    setState({
      ...state,
      categories: [...newCats],
    });
  }, [getCategories]);

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
  const toggleCategory = (index) => {
    setState({
      ...state,
      categories: state.categories.map((cat, i) => {
        if (i === index) {
          cat.isOpen = !cat.isOpen;
        } else {
          cat.isOpen = false;
        }

        return cat;
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
            <div className=" h-screen  w-64 shadow bg-white ">
              <div className="h-full overflow-x-hidden overflow-y-auto">
                <ul>
                  <li className="h-16 border-b flex items-center justify-center">
                    <h1 className="font-bold italic text-green-400s text-3xl">
                      Grocery <span className="text-green-500">Max</span>
                    </h1>
                  </li>
                </ul>
                <AnimateSharedLayout>
                  <motion.ul layout>
                    {/* <div> */}
                    {loading ? (
                      <div>
                        {Array.from(Array(10).keys()).map((item) => {
                          return (
                            <motion.div
                              className="mx-2 my-5  rounded bg-gray-200 animate-pulse"
                              key={item}
                            >
                              <div className="py-4 px-2"></div>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <>
                        {state.categories &&
                          state.categories.map((category, i) => (
                            <div key={category.id}>
                              <motion.li
                                layout
                                onClick={() => toggleCategory(i)}
                                className="mx-1 rounded  capitalize text-sm cursor-pointer  my-2 "
                              >
                                <div className=" py-1 px-2 w-full flex items-center">
                                  <span>
                                    <img
                                      src={`/images/${category.photo}`}
                                      className="h-5 mr-3"
                                    />
                                  </span>
                                  <span className="mr-auto font-medium text-gray-800">
                                    {category.name}
                                  </span>
                                  <span>
                                    <ChevronRightIcon className="h-3 mr-3 text-gray-500" />
                                  </span>
                                </div>
                              </motion.li>
                              <AnimatePresence>
                                {category.subcategories &&
                                  category.isOpen &&
                                  category.subcategories.map((subcategory) => {
                                    return (
                                      <motion.div
                                        layout
                                        key={subcategory.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                      >
                                        <Link
                                          href={`/${category.id}/${subcategory.id}`}
                                          prefetch={false}
                                        >
                                          <div
                                            onClick={(e) => e.stopPropagation()}
                                            className="pl-14 py-2 cursor-pointer"
                                          >
                                            {subcategory.name}
                                          </div>
                                        </Link>
                                      </motion.div>
                                    );
                                  })}
                              </AnimatePresence>
                            </div>
                          ))}
                      </>
                    )}
                    {/* </div> */}
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

export default withApollo({ ssr: false })(Dsidedrawer);

// visible: (i) => ({
//   opacity: 1,
//   transition: {
//     delay: i * 0.3,
//   },
// }),
