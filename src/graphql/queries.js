/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!, $date: AWSDate!) {
    getTransaction(id: $id, date: $date) {
      id
      date
      payee
      category
      paymentMethod
      cashFlow
      amount
      comment
      createdAt
      updatedAt
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $id: ID
    $date: ModelStringKeyConditionInput
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTransactions(
      id: $id
      date: $date
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        date
        payee
        category
        paymentMethod
        cashFlow
        amount
        comment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
