import { gql } from "@apollo/client";

// ============================= CREATE  MUTATION =================>
export const CREATE_SUBCATEGORY = gql`
  mutation createSubcategory($photo: String!, $name: String!, $category: ID) {
    createSubcategory(
      input: { photo: $photo, name: $name, category: $category }
    ) {
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
// ============================= DELETE  MUTATION =================>
export const DELETE_SUBCATEGORY = gql`
  mutation deleteSubcategory($id: ID!) {
    deleteSubcategory(id: $id) {
      errors {
        field
        message
      }
      subcategory {
        id
      }
    }
  }
`;
// ============================= UPDATE  MUTATION =================>
export const UPDATE_SUBCATEGORY = gql`
  mutation updateSubcategory(
    $id: ID!
    $name: String!
    $photo: String!
    $category: ID
  ) {
    updateSubcategory(
      input: { id: $id, name: $name, photo: $photo, category: $category }
    ) {
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
