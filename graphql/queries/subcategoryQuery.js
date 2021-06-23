import { gql } from "@apollo/client";

// ============================= GET ALL QUERY =================>

export const GET_SUBCATEGORIES = gql`
  {
    getSubcategories {
      errors {
        field
        message
      }
      subcategory {
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
        name
      }
    }
  }
`;
// ============================= GET SINGLE QUERY =================>

export const GET_SUBCATEGORY_NORMAL = gql`
  query getSubcategoryNormal($id: ID!) {
    getSubcategoryNormal(id: $id) {
      id
      name
      photo
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
