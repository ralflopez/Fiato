import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { prisma } from '../../../../db/prisma/client'
import jwt from 'jsonwebtoken'

interface Args { 
    email: string 
    username: string
    password: string
}

export const register = async (_: null, {email, username, password}: Args, context: any) => {
    if (context.user_id) {
        throw 'You are already logged in'
    }

    // check if everything is present
    if (!username || !email || !password) {
        throw 'Please provide required fields'
    }

    // check password length
    if (password.length < 8) {
        throw 'Password should be atleast 8 characters'
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
        throw 'Unable to make an account. Try again later'
    }

    return user
}

export const login = async (_: null, {email, username, password}: Args, context: any) => {
    if (context.user_id) {
        throw 'You are already logged in'
    }

    // check if username v email
    if (!username && !email) {
        throw 'Please enter a username and/or email'
    }

    // check if username of email is valid
    const user: User | null = await prisma.user.findFirst({
        where: {
            email: email ? email : undefined,
            username: username ? username : undefined
        }
    })

    if (!user) {
        throw 'Invalid username/email or password'
    }

    // confirm password
    const isValid = await bcrypt.compare(password, user?.hash as string)

    if (!isValid) {
        throw 'Invalid username/email or password'
    }

    // create token
    const secret = process.env.JWT_SECRET || 'jwtsecretabcd'
    const accessToken: string = jwt.sign({ id: user?.id }, secret, {
        expiresIn: '5min'
    })
    
    return { token: `Bearer ${accessToken}`}
}