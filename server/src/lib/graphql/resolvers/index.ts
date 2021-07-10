import { login, register } from './mutatation/auth'
import { cashIn, cashOut } from './mutatation/cashTransaction'
import { addWatchlist, removeWatchlist } from './mutatation/watchlist'
import { buy, sell } from './mutatation/trade'
import { getUser } from './query'
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
        cashOut,
        addWatchlist,
        removeWatchlist,
        buy,
        sell
    }
}

// resolver methods