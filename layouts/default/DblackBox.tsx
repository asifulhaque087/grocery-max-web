import { useReactiveVar } from "@apollo/client";
import { userSideDrawerVar } from "../../graphql/reactivities/toogleVariable";

const DblackBox = () => {
  const userSideDrawer = useReactiveVar(userSideDrawerVar);

  return (
    <div
      className={`mt-14 fixed inset-y-0 left-0  ${
        userSideDrawer ? "hidden md:hidden" : "block md:hidden"
      }   `}
    >
      this is default black box
    </div>
  );
};

export default DblackBox;
