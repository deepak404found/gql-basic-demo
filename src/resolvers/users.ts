import { Resolvers } from "../generated/graphql"
import UsersModel from "../models/UsersModel"

const userResolver: Resolvers = {
    Query: {
        getUsers: async () => {
            return [
                {
                    id: 1,
                    name: "John",
                    email: "sample@gmail.com",
                    password: "password",
                },
            ]
        },
        getUser: async (_, { username, password }) => {
            const user = UsersModel.findOne({ username, password })
            return user
        },
    },
    User: {
        posts: async () => {
            return [
                {
                    id: 1,
                    title: "Sample post",
                    body: "This is a sample post",
                }
            ]
        }
    }
}

export default userResolver