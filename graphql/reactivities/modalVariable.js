import { makeVar } from "@apollo/client";

export const universalModalVar = makeVar(
  process.env.NODE_ENV === "production" ? true : false
);
