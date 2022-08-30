import { useReactiveVar } from "@apollo/client";
import React from "react";
import adminAuth from "../../auths/adminAuth";
import ClientOnly from "../../components/ClientOnly";
import { userSideDrawerVar } from "../../graphql/reactivities/toogleVariable";
import Asidedrawer from "./Asidedrawer";
import Atopbar from "./Atopbar";

const AdminLayout = (props) => {
  const userSideDrawer = useReactiveVar(userSideDrawerVar);

  return (
    <div>
      <ClientOnly>
        <Atopbar />
      </ClientOnly>
      <div className={`${userSideDrawer ? "ml-0 md:ml-64" : "ml-0 md:ml-0"} `}>

      <ClientOnly>
        <Asidedrawer {...props} />
      </ClientOnly>
        {props.children}
      </div>
    </div>
  );
};

export default adminAuth(AdminLayout);
