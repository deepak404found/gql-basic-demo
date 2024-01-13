import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { makeExecutableSchema } from '@graphql-tools/schema'
import Resolvers from "./resolvers/index";
import mongoose from "mongoose";
import { vars } from "./env";

const typeDefs = loadSchemaSync('src/schema/**/*.gql', {
    loaders: [new GraphQLFileLoader()],
})

let mods = makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: Resolvers,
})

async function startApolloServer() {
    const server = new ApolloServer({
        schema: mods,
    });

    mongoose
        .connect(vars.mongoURI)
        .then(async () => {
            const { url } = await startStandaloneServer(server);
            console.log(`🚀 Server ready at ${url}`)
        })
}

startApolloServer();