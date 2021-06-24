import { InMemoryCache } from "@apollo/client";

export default new InMemoryCache({
  typePolicies: {
    //   those are the ROOT_QUERY
    Query: {
      fields: {
        getCategories: {
          merge: (existing, incoming) => {
            return incoming;
          },
        },
        getCategoriesByAdmin: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        getBanners: {
          merge: (existing, incoming) => {
            return incoming;
          },
        },
        getBannersByAdmin: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        getSubcategories: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        getProductsByAdmin: {
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
          return toReference({
            __typename: "Category",
            id: args.id,
          });
        },
        getBanner(_, { args, toReference }) {
          return toReference({
            __typename: "Banner",
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
        getSubcategoryNormal(_, { args, toReference }) {
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
        getProductByAdmin(_, { args, toReference }) {
          return toReference({
            __typename: "Product",
            id: args.id,
          });
        },
        getProductDetails(_, { args, toReference }) {
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
