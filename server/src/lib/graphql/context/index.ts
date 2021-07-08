import { ExpressContext } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

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

    return {
        ...context,
        user_id: user?.id,
    }
}