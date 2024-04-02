/**
 * GraphQL type definitions for the API.
 *
 * This file exports the GraphQL schema definition as a constant. The schema defines the following types:
 *
 * - Query: Root query type containing the "me" field to query the currently authenticated user.
 * - Mutation: Root mutation type containing fields to login, add a user, save a book, and remove a book.
 * - User: Represents a user object containing ID, username, email, book count, and saved books.
 * - Book: Represents a book object containing book details.
 * - BookInput: Input type for saving a book containing book details.
 * - Auth: Represents the authentication return type containing the JWT token and user.
 */
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput!): User
    removeBook(bookId: String!): User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  input BookInput {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: String!
    user: User
  }
`;

module.exports = typeDefs;
