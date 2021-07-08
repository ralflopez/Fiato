import { gql } from '@apollo/client'

export const ADD_WATCHLIST = gql`
    mutation ADD_WATCHLIST($symbol: String!){
        addWatchlist(symbol: $symbol) {
            symbol
            user_id
        }
    }
`

export const REMOVE_WATCHLIST = gql`
    mutation REMOVE_WATCHLIST($symbol: String!) {
        removeWatchlist(symbol: $symbol) {
            symbol,
            user_id
        }
    }
`