require("dotenv").config()
const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone");
const { mongoConnect } = require("./config/mongoConnection");
const { userTypeDefs, userResolvers } = require("./schemas/user");
// const {} = require("")

const server = new ApolloServer({
    typeDefs: [userTypeDefs],
    resolvers: [userResolvers]
});

(async () => {
    try {
        await mongoConnect()
        const { url } = await startStandaloneServer(server, {
            listen: { port: 3000 }
        });
        console.log(`🚀  Server ready at: ${url}`);
    } catch (error) {
        console.log(error);
    }
})();