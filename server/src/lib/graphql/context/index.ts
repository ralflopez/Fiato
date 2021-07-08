import { ExpressContext } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { MyContext } from './context.type'

dotenv.config()
export const cookieName: string = 'afcicaetsostoken'

export const context = (context: ExpressContext) => {
    // get token from req cookies
    const cookieValue: string | null = context.req.cookies[cookieName]
    const accessToken: string = cookieValue?.split(' ')[1] || ''

    // verify token
    let user: any = null
    try {
        user = jwt.verify(accessToken, process.env.JWT_SECRET as string)
    } catch (err) {}

    // put in context object
    const newContext: MyContext = {
        ...context,
        user_id: user?.id
    }

    return newContext
}