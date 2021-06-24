import { gql } from "@apollo/client";

// ============================= CREATE CATEGORY MUTATION =================>
export const CREATE_BANNER = gql`
  mutation createBanner($photo: String!) {
    createBanner(input: { photo: $photo }) {
      errors {
        field
        message
      }
      banner {
        id
        photo
        createdAt
      }
    }
  }
`;
// ============================= DELETE CATEGORY MUTATION =================>
export const DELETE_BANNER = gql`
  mutation deleteBanner($id: ID!) {
    deleteBanner(id: $id) {
      errors {
        field
        message
      }
      banner {
        id
      }
    }
  }
`;
// ============================= UPDATE CATEGORY MUTATION =================>
export const UPDATE_BANNER = gql`
  mutation updateBanner($id: ID!, $photo: String!) {
    updateBanner(input: { id: $id, photo: $photo }) {
      errors {
        field
        message
      }
      banner {
        id
        photo
        createdAt
      }
    }
  }
`;
