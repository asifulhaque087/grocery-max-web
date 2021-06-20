import { gql } from "@apollo/client";

// ============================= GET ALL QUERY =================>

export const GET_PRODUCTS = gql`
  {
    getProducts {
      id
      name
      photo
      description
      stock
      qty
      unit
      price
      discountPrice
      totalSell
      createdAt

      category {
        id
        name
      }
      subcategory {
        id
        name
      }
    }
  }
`;
// ============================= GET SINGLE QUERY =================>

export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      photo
      description
      stock
      qty
      unit
      price
      discountPrice
      totalSell
      createdAt
      category {
        id
        name
      }
      subcategory {
        id
        name
      }
    }
  }
`;
// ============================= GET  SUBCATEGORY TO PRODUCT QUERY =================>

export const GET_SUB_PRO = gql`
  query getSubToPro($subcategoryId: ID!) {
    getSubToPro(subcategoryId: $subcategoryId) {
      id
      name
      photo
      description
      stock
      qty
      unit
      price
      discountPrice
      totalSell
      createdAt
    }
  }
`;
