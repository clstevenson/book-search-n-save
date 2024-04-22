import { gql } from '@apollo/client';

// display saved books for logged-in user
export const GET_ME=gql`
query me($username: String) {
  me(username: $username) {
    bookCount
    savedBooks {
      bookId
      title
      authors
      description
      image
      link
    }
  }
}
`;
