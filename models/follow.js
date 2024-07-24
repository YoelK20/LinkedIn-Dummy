const { getDatabase } = require("../config/mongoConnection")


const tableFollow = () => {
    return getDatabase().collection("Follow")

}

const followUser = async (data) => {
    const follower = await tableFollow().insertOne(data)

    const showFollower = await tableFollow().find().toArray()

    return showFollower
}

module.exports = { followUser }