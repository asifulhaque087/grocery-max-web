import { gql } from "@apollo/client";

// ============================= CREATE  MUTATION =================>
export const CREATE_ORDER = gql`
  mutation createOrder(
    $paymentMethod: String
    $itemPrice: String
    $taxPrice: String
    $shippingPrice: String
    $totalPrice: String
    $shippingAddress: ShippingCreateInput
    $orderItems: [OrderItemCreateInput]
  ) {
    createOrder(
      input: {
        paymentMethod: $paymentMethod
        itemPrice: $itemPrice
        taxPrice: $taxPrice
        shippingPrice: $shippingPrice
        totalPrice: $totalPrice
        shippingAddress: $shippingAddress
        orderItems: $orderItems
      }
    ) {
      id
      user {
        id
        name
        email
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
      itemPrice
      taxPrice
      shippingPrice
      totalPrice
      isPaid
      isDelivered
    }
  }
`;
// ============================= DELETE  MUTATION =================>
export const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
    }
  }
`;
// ============================= DELETE  MUTATION =================>
export const DELETE_ORDER_BY_USER = gql`
  mutation deleteOrderByUser($id: ID!) {
    deleteOrderByUser(id: $id) {
      id
    }
  }
`;
// ============================= UPDATE  MUTATION =================>
export const UPDATE_ORDER_TO_PAID = gql`
  mutation updateOrderToPaid($id: ID, $email: String, $source: ID) {
    updateOrderToPaid(input: { id: $id, email: $email, source: $source }) {
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
    }
  }
`;
// ============================= UPDATE  MUTATION =================>
export const UPDATE_ORDER_TO_DELIVERED = gql`
  mutation updateOrderToDelivered($id: ID!) {
    updateOrderToDelivered(id: $id) {
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
