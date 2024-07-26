import { gql } from "@apollo/client";

export const DO_LOGIN = gql`

mutation UserLogin($input: ReqLogin) {
    userLogin(input: $input) {
      username
      access_token
    }
  }`