require("dotenv").config()
const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone");
const { mongoConnect } = require("./config/mongoConnection");
const { userTypeDefs, userResolvers } = require("./schemas/user");
const authentication = require("./helpers/auth");
const { postTypeDefs, postResolvers } = require("./schemas/post");

const server = new ApolloServer({
    typeDefs: [userTypeDefs, postTypeDefs],
    resolvers: [userResolvers, postResolvers]
});

(async () => {
    try {
        await mongoConnect()

        const { url } = await startStandaloneServer(server, {
            context: async ({req, res}) => {
                return {
                    authentication: async () => {
                        return await authentication(req)
                    }
                }
            },
            listen: { port: 3000 }
        });

        console.log(`🚀  Server ready at: ${url}`);
    } catch (error) {
        console.log(error);
    }
})();