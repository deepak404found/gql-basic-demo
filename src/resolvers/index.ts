import { merge } from "lodash"
import userResolver from "./users"

const Resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
}

export default merge(Resolvers, userResolver)