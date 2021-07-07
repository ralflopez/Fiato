import express, { Express } from 'express'
import { apolloServer } from './lib/graphql/apolloServer'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth'

const app: Express = express()

// set up express middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/auth', authRoute)

// set up grapqhl
apolloServer.applyMiddleware({ app })

// start express server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('listening at port ' + PORT))
