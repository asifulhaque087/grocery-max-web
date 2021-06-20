import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  return <div>this is subcategory to product {router.query.categoryId}</div>;
};

export default index;
