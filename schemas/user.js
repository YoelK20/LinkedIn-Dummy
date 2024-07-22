const typeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username: String
        email: String
        password: String
    }

    input CreateUserInput {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    type Query {
        getUsers: [User]
        getUsersById: (id: ID): User
        getUserByName: (name: String!): User
        getUserByUsername: (name: String!): User
    }

    type Mutation {
        registerUser(input: CreateUserInput): User
    }
`;
