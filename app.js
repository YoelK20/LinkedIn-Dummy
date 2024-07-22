require("dotenv").config()
const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone");
const { mongoConnect } = require("./config/mongoConnection");
// const {} = require("")

const server = new ApolloServer({

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