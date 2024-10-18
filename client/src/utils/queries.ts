import { gql } from '@apollo/client';

export const GET_USER = gql`
  mutation GetUser($username: String!) {
    user(username: $username) {
      username
      email 
        _id
        savedBooks {
          _id 
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
`;

export const GET_ME = gql`
  query me {
    me {
      username
      email
      _id
      savedBooks {
        _id
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const SEARCH_BOOKS = gql`
  query searchBooks($search: String!) {
    searchBooks(search: $search) {
      _id
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;

export const GET_BOOKS = gql`
query GetBook($bookId: String!) {
  book(bookId: $bookId) {
    _id
    bookId
    title
    authors
    description
    image
    link
  }
}
`;
