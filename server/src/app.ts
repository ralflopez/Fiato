import express, { Express } from 'express'
import { apolloServer } from './lib/graphql/apolloServer'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth'
import cors from 'cors'

const app: Express = express()

// set up express middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/auth', authRoute)

// cors configuration
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

// set up grapqhl
apolloServer.applyMiddleware({ 
    app,
    cors: corsOptions
 })

// start express server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('listening at port ' + PORT))
