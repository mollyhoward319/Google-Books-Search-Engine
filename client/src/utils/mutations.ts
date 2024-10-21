import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation Mutation($input: AddUserInput!) {
  addUser(input: $input) {
    user {
      _id
      email
      password
      }
    }
  }

`;


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
      _id
      username
      savedBooks {
        bookID
        title
        authors
        description
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookID: String!) {
    removeBook(bookID: $bookID) {
      _id
    bookID
    title
    authors
    description
    image
    link
    }
  }
`;
