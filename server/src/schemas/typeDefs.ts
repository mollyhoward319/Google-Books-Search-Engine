import { gql } from 'graphql-tag';

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    bookId: String!
    authors: [String]!
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }
  
  input AddUserInput {
    username: String!
    email: String!
    password: String!
  }

  input BookInput {
    authors: [String]!
    description: String!
    title: String!
    bookId: String!
    image: String!
    link: String!
  }

  type Query {
    searchBooks(searchInput: String!): [Book]!
    me: User
    users: [User]!
    user(username: String!): User
    books: [Book]
    book(bookId: String!): Book
  }

  type Mutation {
    addUser(input: AddUserInput!): User
    login(email: String!, password: String!): Auth

    addBook(input: BookInput!): User 
    removeBook(bookId: String!): User
  }
`;

export default typeDefs;
