import Head from "next/head";
import React from "react";
import Footer from "../components/default/Footer";
import BannerSlider from "../components/default/homepage/BannerSlider";
import MainSlider from "../components/default/homepage/MainSlider";
import ShoppingCart from "../components/default/ShoppingCart";
import FullPageLoading from "../components/skeletonLoading/FullPageLoading";
import client from "../graphql/client";
import { GET_BANNERS } from "../graphql/queries/bannerQuery";
import {
  GET_BEST_SELLING_PRODUCTS,
  GET_MOST_DISCOUNT_PRODUCTS,
  GET_NEW_ARRIVAL_PRODUCTS,
} from "../graphql/queries/productQuery";
// import { GET_CATEGORIES } from "../graphql/queries/categoryQuery";
import DefaultLayout from "../layouts/default/DefaultLayout";

const Home = ({
      bannerLoading,
      banners,
      mostDiscountLoading,
      mostDiscountProducts,
      newArrivalLoading,
      newArrivalProducts,
      bestSellingLoading,
      bestSellingProducts
}) => {
  if (
    bannerLoading ||
    bestSellingLoading ||
    newArrivalLoading ||
    mostDiscountLoading
  ) {
    return (
      <div>
        <FullPageLoading />
      </div>
    );
  }


  return (
    <DefaultLayout>
      <div className="z-0">
        <Head>
          <title>This is Grocery App</title>
          <meta name="description" content="best grocery shop" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* <ShoppingCart {...props} /> */}
        <ShoppingCart />
        {/* banner part top */}
        <BannerSlider items={banners} />
        <div>
          <div>
            <h1 className="capitalize text-lg font-medium text-gray-700 text-center">
              <span className="border-b-2 pb-2 border-yellow-500">
                most discount
              </span>
            </h1>
          </div>
          <MainSlider items={mostDiscountProducts} />
        </div>
        {/* New Arrival*/}
        <div>
          <div>
            <h1 className="capitalize text-lg font-medium text-gray-700 text-center">
              <span className="border-b-2 pb-2 border-yellow-500">
                new arrival
              </span>
            </h1>
          </div>
          <MainSlider items={newArrivalProducts} />
        </div>
        {/* best selling*/}
        <div>
          <div>
            <h1 className="capitalize text-lg font-medium text-gray-700 text-center">
              <span className="border-b-2 pb-2 border-yellow-500">
                best selling
              </span>
            </h1>
          </div>
          <MainSlider items={bestSellingProducts} />
        </div>
      </div>
      <Footer />
    </DefaultLayout>
  );
};

export default Home;


// Data fetching
export async function getServerSideProps() {

  // fetching banner
  const { loading: bannerLoading, data: { getBanners: banners } = {} } = await client.query({
    query:  GET_BANNERS,
  });


  // fetching most discount products
  const {
    loading: mostDiscountLoading,
    data: { getMostDiscountProducts: mostDiscountProducts } = {},
  } = await client.query({
    query:  GET_MOST_DISCOUNT_PRODUCTS,
  });


  // fetching new arrival products
  const {
    loading: newArrivalLoading,
    data: { getBestNewArrivalProducts: newArrivalProducts } = {},
  } = await client.query({
    query:  GET_NEW_ARRIVAL_PRODUCTS,
  });


  // fetching best selling products
  const {
    loading: bestSellingLoading,
    data: { getBestSellingProducts: bestSellingProducts } = {},
  } = await client.query({
    query:  GET_BEST_SELLING_PRODUCTS,
  });





  // var sortedObjs = _.sortBy( data.conferences, 'intervals' );

  return {
    props: {
      bannerLoading,
      banners,
      mostDiscountLoading,
      mostDiscountProducts,
      newArrivalLoading,
      newArrivalProducts,
      bestSellingLoading,
      bestSellingProducts
    },
  };
}
