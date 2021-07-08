import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation Login($username: String, $email: String, $password: String!) {
    login(username: $username, email: $email, password: $password) {
      token
    }
}
`

export const REGISTER_USER = gql`
mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
        id
        email
        username
    }
}
`