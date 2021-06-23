import { makeVar } from "@apollo/client";
import jwtDecode from "jwt-decode";

export const loggedInUserVar = makeVar(
  typeof window !== "undefined"
    ? sessionStorage.getItem("jwtToken") &&
        jwtDecode(sessionStorage.getItem("jwtToken"))
    : null
);
