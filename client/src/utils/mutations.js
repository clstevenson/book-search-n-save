import { gql } from '@apollo/client';

// user login, returning token and user info
export const LOGIN_USER=gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;
