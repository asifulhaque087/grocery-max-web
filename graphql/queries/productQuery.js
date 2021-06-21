import { gql } from "@apollo/client";

// ============================= GET ALL QUERY =================>

export const GET_PRODUCTS_BY_ADMIN = gql`
  {
    getProductsByAdmin {
      errors {
        field
        message
      }
      product {
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

        subcategory {
          id
          name
          category {
            id
            name
          }
        }
      }
    }
  }
`;
// ============================= GET SINGLE QUERY =================>

export const GET_PRODUCT_BY_ADMIN = gql`
  query getProductByAdmin($id: ID!) {
    getProductByAdmin(id: $id) {
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

      subcategory {
        id
        name
        category {
          id
          name
        }
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
