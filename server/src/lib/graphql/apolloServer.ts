import { ApolloServer, ExpressContext } from 'apollo-server-express'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import { context } from './context'
// @ts-ignore
import httpHeadersPlugin from 'apollo-server-plugin-http-headers'

export const apolloServer = new ApolloServer({ 
    typeDefs, 
    resolvers,
    plugins: [ httpHeadersPlugin ],
    context
})