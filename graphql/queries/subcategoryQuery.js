import { gql } from "@apollo/client";

// ============================= GET ALL QUERY =================>

export const GET_SUBCATEGORIES = gql`
  {
    getSubcategories {
      id
      name
      photo
      createdAt
      category {
        id
        name
      }
    }
  }
`;
// ============================= GET SINGLE QUERY =================>

export const GET_SUBCATEGORY = gql`
  query getSubcategory($id: ID!) {
    getSubcategory(id: $id) {
      id
      name
      photo
      createdAt
      category {
        id
      }
    }
  }
`;
// ============================= GET CATEGORY TO SUBCATEGORY QUERY =================>

export const GET_CAT_TO_SUB = gql`
  query getCatToSub($categoryId: ID!) {
    getCatToSub(categoryId: $categoryId) {
      id
      name
      photo
    }
  }
`;
