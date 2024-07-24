const { ObjectId } = require("mongodb")
const { getDatabase } = require("../config/mongoConnection")
const { token } = require("../helpers/jwt")

const UserDB = () => {
    return getDatabase().collection("Users")
}

const findAllUser = async () => {
    const agg = [
        {
            '$project': {
                'password': 0
            }
        }
    ]
    const users = await UserDB().aggregate(agg).toArray()

    return users
}

const findUserById = async (id) => {

    const agg = [
        {
            '$match': {
                _id: new ObjectId(id),
            }
        }, {
            '$project': {
                'password': 0,
                '_id': 0
            }
        }
    ];

    const user = await UserDB().aggregate(agg).toArray()

    return user[0]
}

const findUserByQuery = async (query) => {
    const agg = [
        {
            '$match': {
                '$or': [
                    {
                        'username': {
                            '$regex': `(?i)${query}(?-i)`
                        }
                    }, {
                        'name': {
                            '$regex': `(?i)${query}(?-i)`
                        }
                    }
                ]
            }
        }, {
            '$project': {
                'password': 0,
                '_id': 0
            }
        }
    ];

    const user = await UserDB().aggregate(agg).toArray()
    console.log(user);
    return user[0]
}

// const findUserByUsername = async (username) => {
//     const user = await UserDB().findOne({ username })
//     return user
// }

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
    findUserByQuery,
    findUserByEmail,
    registerNewUser,
    Login
}