require("dotenv").config()

const { MongoClient } = require("mongodb");

//Connections
const url = process.env.MONGODB_URI
const client = new MongoClient(url)

//Database Name
const dbName = "LinkedIn_Project"

async function mongoConnect() {
    try {
        await client.connect()
        console.log("Success");

        return "done."
    } catch (error) {
        console.log("Mongo");
        throw error
    }
}

const getDatabase = () => {
    return client.db(dbName)
}

module.exports = {
    mongoConnect,
    getDatabase
}