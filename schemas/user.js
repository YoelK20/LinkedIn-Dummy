const { hash, comparePassword } = require("../helpers/bcrypt");
const { token } = require("../helpers/jwt");
const { findAllUser, findUserById, findUserByName, findUserByUsername, registerNewUser, findUserByEmail } = require("../models/user");

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

    input ReqLogin {
        email: String!
        password: String!
    }

    type ResponseLogin {
        username: String
        access_token: String
    }

    type Query {
        getUsers: [User]
        getUserById(_id: ID): User
        getUserByName(name: String!): User
        getUserByUsername(username: String!): User
    }

    type Mutation {
        registerUser(input: CreateUserInput): User
        userLogin(input: ReqLogin): ResponseLogin
    }
`;

const resolvers = {
    Query: {
        getUsers: async () => {
            const users = await findAllUser()

            return users
        },

        getUserById: async (_parent, args) => {
            const { _id } = args
            console.log(args);
            const user = await findUserById(_id)

            return user
        },

        getUserByName: async (_parent, args) => {
            const { name } = args
            const user = await findUserByName(name)

            return user
        },

        getUserByUsername: async (_parent, args) => {
            const { username } = args
            const user = await findUserByUsername(username)

            return user
        }
    },

    Mutation: {
        registerUser: async (_parent, args) => {
            const { name, username, email, password } = args.input

            const dataUser = await registerNewUser({
                name,
                username,
                email,
                password: hash(password)
            })

            return dataUser
        },

        userLogin: async (_parent, args) => {
            const { email, password } = args.input

            const isEmailValid = await findUserByEmail(email)
            if (!isEmailValid) throw "Invalid Email"
            // console.log(isEmailValid.password);

            const isPassValid = comparePassword(password, isEmailValid.password)
            if (!isPassValid) throw "Invalid Password"

            const payload = {
                _id: isEmailValid._id,
                name: isEmailValid.name,
                username: isEmailValid.username,
                email: isEmailValid.email
            }
            const access_token = token(payload)
            console.log(isEmailValid.username, access_token)

            return { username: isEmailValid.username, access_token }
        }
    }
}

module.exports = {
    userTypeDefs: typeDefs,
    userResolvers: resolvers
}