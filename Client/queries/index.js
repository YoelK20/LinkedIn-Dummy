import { gql } from "@apollo/client";

export const DO_LOGIN = gql`

mutation UserLogin($input: ReqLogin) {
    userLogin(input: $input) {
      username
      access_token
    }
  }`

export const DO_REGISTER = gql`

mutation UserLogin($input: CreateUserInput) {
  registerUser(input: $input) {
    _id
    name
    username
    email
    password
  }
}
`