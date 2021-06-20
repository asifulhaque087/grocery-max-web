import jwtDecode from "jwt-decode";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const userAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      if (
        sessionStorage.getItem("jwtToken") &&
        (jwtDecode(sessionStorage.getItem("jwtToken")) as any).role === "buyer"
      ) {
        setVerified(true);
      } else {
        Router.replace("/login");
      }
    }, []);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default userAuth;

// const userAuth = (InnerComponent) => {
//     return (props) => {

//         if (true) {
//           return <InnerComponent {...props} />;
//         } else {
//           return <h1>return to default login page</h1>;
//         }
//       };
// }

// export default userAuth
