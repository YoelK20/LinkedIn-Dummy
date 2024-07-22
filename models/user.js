const { ObjectId } = require("mongodb")
const { getDatabase } = require("../config/mongoConnection")

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

const registerUser = async (pl) => {
    const newUser = await UserDB().insertOne(pl)
    const dataUser = await UserDB().findOne({
        _id: new ObjectId(newUser.insertedId)
    })

    return dataUser
}

module.exports = {
    findAllUser,
    findUserById,
    findUserByName,
    findUserByUsername,
    registerUser
}