import { gql } from "@apollo/client";

// ============================= CREATE  MUTATION =================>
export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $photo: String!
    $description: String
    $price: String
    $discountPrice: String
    $qty: String
    $unit: String
    $stock: String
    $subcategory: ID
  ) {
    createProduct(
      input: {
        name: $name
        photo: $photo
        description: $description
        price: $price
        discountPrice: $discountPrice
        qty: $qty
        unit: $unit
        stock: $stock
        subcategory: $subcategory
      }
    ) {
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
// ============================= DELETE  MUTATION =================>
export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      errors {
        field
        message
      }
      product {
        id
      }
    }
  }
`;
// ============================= UPDATE  MUTATION =================>
export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: ID!
    $name: String!
    $photo: String!
    $description: String
    $stock: String
    $qty: String
    $unit: String
    $price: String
    $discountPrice: String
    $subcategory: ID
  ) {
    updateProduct(
      input: {
        id: $id
        name: $name
        photo: $photo
        description: $description
        stock: $stock
        qty: $qty
        unit: $unit
        price: $price
        discountPrice: $discountPrice
        subcategory: $subcategory
      }
    ) {
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
