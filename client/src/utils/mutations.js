import { gql } from '@apollo/client';

// user login, returning token
export const LOGIN_USER=gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

// create new user and return token
export const ADD_USER=gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
  }
}
`;
