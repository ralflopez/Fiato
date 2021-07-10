import { 
    register, 
    login, 
    cashIn, 
    cashOut, 
    addWatchlist, 
    removeWatchlist, 
    buy, 
    sell 
} from './mutatation'
import { 
    getUser, 
    getCash, 
    getPortfolio,
    getWatchlist,
    getTradeTransactions
} from './query'


// root resolvers
export const resolvers = {
    // root query
    Query: {
        user: getUser,
        cash: getCash,
        portfolio: getPortfolio,
        watchlist: getWatchlist,
        trade: getTradeTransactions
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