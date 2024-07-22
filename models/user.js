const { ObjectId } = require("mongodb")
const { getDatabase } = require("../config/mongoConnection")
const { token } = require("../helpers/jwt")

const UserDB = () => {
    return getDatabase().collection("Users")
}

const findAllUser = async () => {
    const users = await UserDB().find().toArray()

    return users
}

const findUserById = async (id) => {
    const user = await UserDB().findOne({
        _id: new ObjectId(id)
    })

    return user
}

const findUserByName = async (name) => {
    const user = await UserDB().findOne({ name })

    return user
}

const findUserByUsername = async (username) => {
    const user = await UserDB().findOne({ username })
    return user
}

const findUserByEmail = async (email) => {
    const user = await UserDB().findOne({ email })
    return user
}

const registerNewUser = async (pl) => {
    const newUser = await UserDB().insertOne(pl)
    const dataUser = await UserDB().findOne({
        _id: new ObjectId(newUser.insertedId)
    })

    return dataUser
}

const Login = async (pl) => {
    const data = token(pl)

    return data
}

module.exports = {
    findAllUser,
    findUserById,
    findUserByName,
    findUserByUsername,
    findUserByEmail,
    registerNewUser,
    Login
}