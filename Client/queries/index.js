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
export const GET_POSTS = gql`
query Query {
  getPost {
    _id
    content
    tags
    imgUrl
    authorId
    author {
      _id
      email
      name
      password
      username
    }
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`
export const GET_USER_PROFILE = gql`
query Query {
  getMyProfile {
    _id
    name
    username
    email
    password
    follower {
      _id
      name
      username
      email
      password
    }
    following {
      _id
      name
      username
      email
      password
    }
  }
}
`