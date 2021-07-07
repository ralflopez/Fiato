import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type User {
        id: String!
        username: String!
        email: String!
        Trade: [Trade]
        CashTransaction: [CashTransaction]
        Watchlist: [Watchlist]
    }

    type Trade {
        id: ID!
        user_id: String!
        user: User!
        symbol: String!
        price: Float!
        shares: Int!
    }

    type CashTransaction {
        id: ID!
        amount: Float!
        user_id: String!
        user: User!
    }

    type Watchlist {
        id: ID!
        user_id: String!
        user: User!
        symbol: String!
    }

    type Auth {
        error: String
        redirect: String
        user: User
    }

    type Query {
        user(id: String!): User
        trades(user_id: String!): [Trade]
        cashTransactions(user_id: String!): [CashTransaction]
        watchlist(user_id: String!): [Watchlist]
    }

    type Mutation {
        register(email: String, username: String, password: String!): Auth!
        login(email: String, username: String, password: String!): Auth!
    }

`