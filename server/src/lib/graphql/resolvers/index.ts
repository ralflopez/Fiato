import { login, register } from './mutatation/auth'
import { getUser } from './query'
import { cashIn, cashOut } from './mutatation/cashTransaction'
import { getCash } from './query/cashTranasction'

// root resolvers
export const resolvers = {
    // root query
    Query: {
        user: getUser,
        getCash
    },

    // root mutation
    Mutation: {
        register,
        login,
        cashIn,
        cashOut
    }
}

// resolver methods