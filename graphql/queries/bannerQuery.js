import { gql } from "@apollo/client";

// ============================= GET CATEGORIES QUERY =================>

export const GET_BANNERS = gql`
  {
    getBanners {
      id
      photo
      createdAt
    }
  }
`;
// ============================= GET CATEGORIES By Admin=================>

// export const GET_CATEGORIES_BY_ADMIN = gql`
//   {
//     getCategoriesByAdmin {
//       errors {
//         field
//         message
//       }
//       category {
//         id
//         name
//         photo
//         createdAt
//       }
//     }
//   }
// `;
// ============================= GET CATEGORY QUERY =================>

export const GET_BANNER = gql`
  query getBanner($id: ID!) {
    getBanner(id: $id) {
      id
      photo
      createdAt
    }
  }
`;
