import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
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

export const ADD_BOOK = gql`
  mutation addBook($input: BookInput!) {
    addBook(input: $input) {
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
