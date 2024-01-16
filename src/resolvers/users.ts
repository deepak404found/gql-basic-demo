import { Resolvers } from "../generated/graphql"
import { BadUserInputError, ErrorHandler, NotFoundError } from "../helpers/errors/ErrorHandler"
import { UserExistsError } from "../helpers/errors/Users"
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
            try {
                // throw new Error("Something went wrong")

                if (password.length < 8) throw new BadUserInputError("Password must be at least 8 characters")

                const user = await UsersModel.findOne({ username, password })

                if (!user) throw new NotFoundError("User not found !!!")

                return {
                    __typename: "User",
                    ...user.toObject()
                }
            } catch (error) {
                return ErrorHandler.handle(error)
            }
        },
        getUserOrPost: async (_, { id }) => {
            const user = await UsersModel.findOne({ uid: id })
            if (user) return {
                __typename: "User",
                ...user.toObject()
            }


            return {
                __typename: "Post",
                id: 1,
                body: "This is a sample post",
            }
        }
    },
    Mutation: {
        createUser: async (parent, { form }, context, info) => {
            try {
                if (form.password.length < 8) throw new BadUserInputError("Password must be at least 8 characters")

                const userExists = await UsersModel.exists({ username: form.username })

                if (userExists) throw new UserExistsError("User already exists", form.username)

                const user = await UsersModel.create(form)

                return {
                    __typename: "User",
                    ...user.toObject()
                }
            } catch (error) {
                return ErrorHandler.handle(error)
            }
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