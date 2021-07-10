import { gql } from "@apollo/client";

export const GET_USER = gql`
    query {
        user {
            username
            email
        }
    }
`

export const GET_CASH = gql`
    query {
        cash {
            cash
        }
    }
`

export const GET_PORTFOLIO = gql`
    query {
        portfolio {
            symbol
            shares
            price
        }
    }
`

export const GET_WATCHLIST = gql`
    query {
        watchlist {
            symbol
        }
    }
`

export const GET_TRADES = gql`
    query {
        trade {
            symbol
            price
            shares
        }
    }
`