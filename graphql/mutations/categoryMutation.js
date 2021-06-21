import { gql } from "@apollo/client";

// ============================= CREATE CATEGORY MUTATION =================>
export const CREATE_CATEGORY = gql`
  mutation createCategory($photo: String!, $name: String!) {
    createCategory(input: { photo: $photo, name: $name }) {
      errors {
        field
        message
      }
      category {
        id
        name
        photo
        createdAt
      }
    }
  }
`;
// ============================= DELETE CATEGORY MUTATION =================>
export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      errors {
        field
        message
      }
      category {
        id
      }
    }
  }
`;
// ============================= UPDATE CATEGORY MUTATION =================>
export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: ID!, $name: String!, $photo: String!) {
    updateCategory(input: { id: $id, name: $name, photo: $photo }) {
      errors {
        field
        message
      }
      category {
        id
        name
        photo
        createdAt
      }
    }
  }
`;
