const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    contact: String!
    firstName: String!
    lastName: String!
    password: String
    accountBal:String!
    token: String!
  }

  input RegisterInput {
    email: String!
    contact: String!
    firstName: String!
    lastName: String!
    password: String!
  }
  type Query {
    getUsers: [User]
    getUser(userId: ID): User!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
  }
`;
