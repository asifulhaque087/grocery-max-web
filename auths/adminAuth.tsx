import jwtDecode from "jwt-decode";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const adminAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      if (
        sessionStorage.getItem("jwtToken") &&
        (jwtDecode(sessionStorage.getItem("jwtToken")) as any).role === "admin"
      ) {
        setVerified(true);
      } else {
        Router.replace("/admin/login");
      }
    }, []);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default adminAuth;

// import { useRouter } from "next/router";

// const adminAuth = (InnerComponent) => {
//   // return (props) => {
//   //   if (typeof window !== "undefined") {
//   //     const router = useRouter();

//   //     if (sessionStorage.getItem("jwtToken")) {
//   //       return <InnerComponent {...props} />;
//   //     } else {
//   //       return router.push("/admin/login");
//   //     }
//   //   }
//   //   return null;
//   // };

//   return (props) => {
//     if (typeof window !== "undefined") {
//       const router = useRouter();

//       if (sessionStorage.getItem("jwtToken")) {
//         return <InnerComponent {...props} />;
//       }
//       router.push("/admin/login");
//       return null;
//     }

//     return null;
//   };
// };

// export default adminAuth;
