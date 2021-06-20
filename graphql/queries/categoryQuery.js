import { gql } from "@apollo/client";

// ============================= GET CATEGORIES QUERY =================>

export const GET_CATEGORIES = gql`
  {
    getCategories {
      errors {
        field
        message
      }
      category {
        id
        name
        photo
        subcategories {
          id
          name
        }
      }
    }
  }
`;
// ============================= GET CATEGORY QUERY =================>

export const GET_CATEGORY = gql`
  query getCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      photo
      subcategories {
        id
        name
        photo
      }
    }
  }
`;
