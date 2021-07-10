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
    let token: any = null
    try {
        token = jwt.verify(accessToken, process.env.JWT_SECRET as string)
        // issue refresh token
        const secret = process.env.JWT_SECRET || 'jwtsecretabcd'
        token = {
            id: jwt.sign({ id: token.id }, secret, { expiresIn: '1h' })
        }
    } catch (err) {}

    // put in context object
    const newContext: MyContext = {
        ...context,
        user_id: token?.id || 'ckqujnoic000770ury7njqs21'
        // user_id: token?.id || 'ckqujmnje000070uryasznrcq'
    }

    return newContext
}