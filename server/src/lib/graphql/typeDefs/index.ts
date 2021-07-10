import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type User {
        id: String!
        username: String!
        email: String!
    }

    type Trade {
        id: ID!
        user_id: String!
        symbol: String!
        price: Float!
        shares: Int!
    }

    type CashTransaction {
        id: ID!
        amount: Float!
        user_id: String!
    }

    type Cash {
        cash: Float!
    }

    type Watchlist {
        id: ID!
        user_id: String!
        symbol: String!
    }

    type Token {
        token: String
    }

    type Portfolio {
        symbol: String!
        shares: Int!
        price: Float!
    }

    type Query {
        user: User!
        cash: Cash!,
        portfolio: [Portfolio!]!
        watchlist: [Watchlist!]!
        trade: [Trade!]!
    }

    type Mutation {
        register(email: String, username: String, password: String!): User!
        login(email: String, username: String, password: String!): Token!
        cashIn(amount: Float!): CashTransaction!
        cashOut(amount: Float!): CashTransaction!
        addWatchlist(symbol: String!): Watchlist!
        removeWatchlist(symbol: String!): Watchlist!
        buy(symbol: String!, shares: Int!): Trade!
        sell(symbol: String!, shares: Int!): Trade!
    }

`