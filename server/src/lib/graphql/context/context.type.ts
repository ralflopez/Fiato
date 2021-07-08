import { ExpressContext } from 'apollo-server-express'

export interface MyContext extends ExpressContext {
    user_id: string
}