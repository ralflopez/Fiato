import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { prisma } from '../../../../db/prisma/client'
import jwt from 'jsonwebtoken'
import { cookieName } from '../../context'

interface Args { 
    email: string 
    username: string
    password: string
}

export const register = async (_: null, {email, username, password}: Args, { user_id }: any) => {
    if (user_id) return { redirect: '/' }

    // check if everything is present
    if (!username || !email || !password) {
        return { error: 'Please provide required fields' }
    }

    // check password length
    if (password.length < 8) {
        return { error: 'Password should be atleast 8 characters' }
    }

    // generate password cash
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // create new user object
    const newUser = {
        username,
        email,
        hash
    }

    // add created user to prisma
    const user: User = await prisma.user.create({
        data: newUser
    })

    if (!user) {
        return { error: 'Unable to make an account. Try again later' }
    }

    return { user }
}

export const login = async (_: null, {email, username, password}: Args, context: any) => {

    // check if username v email
    if (!username && !email) {
        return { error: 'Please enter a username of email' }
    }

    // check if username of email is valid
    const user: User | null = await prisma.user.findFirst({
        where: {
            email: email ? email : undefined,
            username: username ? username : undefined
        }
    })

    if (!user) {
        return { error: 'Invalid username/email or password' }
    }

    // confirm password
    const isValid = await bcrypt.compare(password, user?.hash as string)

    if (!isValid) {
        return { error: 'Invalid username/email or password' }
    }

    // create token
    const secret = process.env.JWT_SECRET || 'jwtsecretabcd'
    const accessToken: string = jwt.sign({ id: user?.id }, secret, {
        expiresIn: '5min'
    })

    // set cookie
    context.setCookies.push({
        name: cookieName,
        value: accessToken,
        options: {
            httpOnly: true,
            maxAge: 3600,
        }
    });
    

    return {
        user :{
            id: user?.id,
            username: JSON.stringify(context.setCookies),
            email: user?.email
        }
    }
}