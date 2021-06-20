import { gql } from "@apollo/client";

// ============================= LOGIN MUTATION =================>
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      errors {
        field
        message
      }
      user {
        id
        role
        name
        email
        token
      }
    }
  }
`;
// ============================= REGISTER MUTATION =================>
export const REGISTER_USER = gql`
  mutation register(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        name: $name
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      errors {
        field
        message
      }
      user {
        id
        role
        name
        email
        token
      }
    }
  }
`;

// ============================= FORGOT PASSWORD MUTATION =================>

export const FORGOT_PASSWORD_USER = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      errors {
        field
        message
      }
      url
    }
  }
`;

// ============================= RESET PASSWORD MUTATION =================>
export const RESET_PASSWORD_USER = gql`
  mutation resetPassword(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      input: {
        resetToken: $resetToken
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      errors {
        field
        message
      }
      user {
        id
        role
        name
        email
        token
      }
    }
  }
`;
