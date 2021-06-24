import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { withApollo } from "../../graphql/client";
import { GET_SUB_PRO } from "../../graphql/queries/productQuery";

import Product from "../../components/default/Product";
import ShoppingCart from "../../components/default/ShoppingCart";
import DefaultLayout from "../../layouts/default/DefaultLayout";
import { GET_SUBCATEGORY_NORMAL } from "../../graphql/queries/subcategoryQuery";
import Footer from "../../components/default/Footer";
import FullPageLoading from "../../components/skeletonLoading/FullPageLoading";

const SubCatToProduct = (props) => {
  const router = useRouter();

  // fetching subcategory by id
  const {
    loading: queryLoading,
    data: { getSubcategoryNormal: subcategory } = {},
  } = useQuery(GET_SUBCATEGORY_NORMAL, {
    variables: { id: router.query.subcategoryId },
  });

  // fetching product by subcategory
  const { loading, data: { getSubToPro: products } = {} } = useQuery(
    GET_SUB_PRO,
    {
      variables: { subcategoryId: router.query.subcategoryId },
    }
  );

  if (queryLoading || loading) {
    return <FullPageLoading />;
  }

  return (
    <DefaultLayout>
      <ShoppingCart {...props} />
      <div>
        <img
          src={`/images/${subcategory.photo}`}
          alt="banner"
          className="w-full m-auto"
        />
      </div>
      <div>
        <h1 className="text-center  font-medium text-xl uppercase">
          {" "}
          <span className="border-b-4 border-green-400">
            {subcategory.name}
          </span>{" "}
        </h1>
      </div>
      <div
        className={`${
          products.length > 5
            ? "grid-layout"
            : "grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:flex flex-wrap justify-center"
        } px-8 my-10`}
      >
        {products &&
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
      <Footer />
    </DefaultLayout>
  );
};

export default withApollo({ ssr: true })(SubCatToProduct);
