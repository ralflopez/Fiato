import express, { Express } from 'express'

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('listening at port ' + PORT))
