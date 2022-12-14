import { useReactiveVar } from "@apollo/client";
import React from "react";
import ClientOnly from "../../components/ClientOnly";
import { userSideDrawerVar } from "../../graphql/reactivities/toogleVariable";
import Dsidedrawer from "./Dsidedrawer";
import Dtopbar from "./Dtopbar";

const DefaultLayout = (props) => {
  const userSideDrawer = useReactiveVar(userSideDrawerVar);

  return (
    <div>
      <ClientOnly>
        <Dtopbar {...props} />
      </ClientOnly>

      <div className={`${userSideDrawer ? "ml-0 md:ml-64" : "ml-0 md:ml-0"} `}>

      <ClientOnly>
        <Dsidedrawer {...props} />
      </ClientOnly>
        {props.children}
      </div>
    </div>
  );
};

export default DefaultLayout;
