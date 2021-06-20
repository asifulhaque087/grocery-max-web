import { InMemoryCache } from "@apollo/client";

export default new InMemoryCache({
  typePolicies: {
    //   those are the ROOT_QUERY
    Query: {
      fields: {
        getCategories: {
          merge: (existing, incoming) => {
            // return [...existing, ...incoming];
            return incoming;
          },
        },
        getSubcategories: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        getProducts: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        getOrders: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        getCategory(_, { args, toReference }) {
          console.log("the id is", args.id);

          return toReference({
            __typename: "Category",
            id: args.id,
          });
        },
        // getCategory: {
        //   read(_, { readField, variables }) {
        //     const allCategories = readField("getCategories");
        //     if (allCategories) {
        //       return allCategories.find((category) => {
        //         const the_id = readField("id", category);
        //         return the_id === variables.id;
        //       });
        //     }
        //     return null;
        //   },
        // },

        getSubcategory(_, { args, toReference }) {
          return toReference({
            __typename: "Subcategory",
            id: args.id,
          });
        },
        // getSubToPro(_, { args, toReference }) {
        //   console.log("hola args", args, toReference);
        //   return toReference({
        //     __typename: "Category",
        //     id: args.id,
        //   });
        // },
        getProduct(_, { args, toReference }) {
          return toReference({
            __typename: "Product",
            id: args.id,
          });
        },
        getOrder(_, { args, toReference }) {
          return toReference({
            __typename: "Order",
            id: args.id,
          });
        },
      },
    },
  },
});
