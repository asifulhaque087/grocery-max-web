import { makeVar } from "@apollo/client";

// if (typeof window !== "undefined") {
// }
export const shippingAddressVar = makeVar(
  typeof window !== "undefined"
    ? localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {}
    : {}
);

export const paymentMethodVar = makeVar(
  typeof window !== "undefined"
    ? localStorage.getItem("paymentMethod")
      ? JSON.parse(localStorage.getItem("paymentMethod"))
      : {}
    : {}
);
