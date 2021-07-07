import { login, register } from './mutatation/auth'
import { getUser } from './query'

// root resolvers
export const resolvers = {
    // root query
    Query: {
        user: getUser
    },

    // root mutation
    Mutation: {
        register,
        login
    }
}

// resolver methods