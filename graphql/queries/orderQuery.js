import { gql } from "@apollo/client";

// ============================= GET ORDERS QUERY =================>

export const GET_ORDERS = gql`
  {
    getOrders {
      id
      user {
        name
      }
      orderItems {
        name
        count
        photo
        price
        product {
          name
        }
      }
      shippingAddress {
        phone
        address
      }
      paymentResult {
        updateTime
      }
      paymentMethod
      taxPrice
      shippingPrice
      totalPrice
      isPaid
      isDelivered
      createdAt
    }
  }
`;
// ============================= GET ORDER QUERY =================>

export const GET_ORDER = gql`
  query getOrder($id: ID!) {
    getOrder(id: $id) {
      id
      user {
        id
        name
        email
      }
      orderItems {
        id
        name
        count
        photo
        price
        product {
          name
          unit
        }
      }
      shippingAddress {
        phone
        address
      }
      paymentResult {
        updateTime
      }
      paymentMethod
      itemPrice
      taxPrice
      shippingPrice
      totalPrice
      isPaid
      isDelivered
    }
  }
`;
// ============================= GET ORDER QUERY =================>

export const GET_USER_TO_ORDER = gql`
  {
    getUserToOrder {
      id
      orderItems {
        id
        name
        count
        photo
        price
        product {
          name
          unit
        }
      }
      shippingAddress {
        phone
        address
      }
      paymentResult {
        updateTime
      }
      paymentMethod
      itemPrice
      taxPrice
      shippingPrice
      totalPrice
      isPaid
      isDelivered
    }
  }
`;
