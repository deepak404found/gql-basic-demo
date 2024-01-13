
const userResolver = {
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
        }
    },
    User: {
        posts: async () => {
            return [
                {
                    id: 1,
                    title: "Sample post",
                    body: "This is a sample post",
                    createdAt: "2021-01-01 10:00:00",
                }
            ]
        }
    }
}

export default userResolver