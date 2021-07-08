import { Router } from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '../db/prisma/client'
import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'

const router: Router = Router()
const cookieName: string = 'afcicaetsostoken'

// new user
router.post('/register', async (req, res) => {
    // extract data from body
    const { username, email, password } = req.body

    // check if everything is present
    if (!username || !email || !password) {
        res.status(403).json({ error: 'Please provide valid input' })
    }

    // check password length
    if (password.length < 8) {
        res.status(403).json({ error: 'Password must be atleast 8 characters ' })
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

    if (user) {
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(500).json({ error: 'Unable to create user' })
    }
})


// existing user
router.post('/login', async (req, res) => {
    const { username, email, password } = req.body
    console.log(req.body)
    // check if username v email
    if (!username && !email) {
        res.status(403).json({ error: 'Please enter a username or email' })
    }

    // check if username of email is valid
    const user: User | null = await prisma.user.findFirst({
        where: {
            email: email ? email : undefined,
            username: username ? username : undefined
        }
    })

    if (!user) {
        res.status(403).json({ error: 'Invalid username/email or password' })
    }

    // confirm password
    const isValid = await bcrypt.compare(password, user?.hash as string)

    if (!isValid) {
        res.status(403).json({ error: 'Invalid username/email or password' })
    }

    // create token
    const secret = process.env.JWT_SECRET || 'jwtsecretabcd'
    const accessToken: string = jwt.sign({ id: user?.id }, secret, {
        expiresIn: '5m'
    })

    // set cookie
    console.log(accessToken)
    res.cookie('access-token', accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
    }).json({
        id: user?.id,
        username: user?.username,
        email: user?.email
    })
})

router.get('/', (req, res) => res.send('response'))


// handle logout
router.post('/logout', async (req, res) => {
    res.cookie(cookieName, '', { maxAge: 0, httpOnly: true })
    res.status(200).send('success')
})

router.get('/', withAuth, (req, res) => {
    res.send('ok na')
})

export function withAuth(req: any, res: any, next: any) {
    // get token from req cookies
    const accessToken = req.cookies[cookieName]
    if (!accessToken) {
        return res.send('true')
    }

    // verify token
    try {
        const secret = process.env.JWT_SECRET || 'jwtsecretabcd'
        const isValid = jwt.verify(accessToken, secret)
        console.log('isvalid')
        console.log(isValid)
        // direct to route
        if (isValid) {
            req.authenticated = true
            return next()
        }
    } catch (err) {
        return res.send('false')
    }
}

export default router