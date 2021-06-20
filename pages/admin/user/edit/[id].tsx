import { useRouter } from "next/router";
import AdminLayout from "../../../../layouts/admin/AdminLayout";

const index = () => {
  const router = useRouter();
  return (
    <AdminLayout>
      <div>this is id {router.query.id}</div>
    </AdminLayout>
  );
};

export default index;
