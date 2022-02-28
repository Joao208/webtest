import 'dotenv/config'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import httpContext from 'express-http-context'
import routes from './routes'

const app = express()
const port = process.env.PORT || 5001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(httpContext.middleware)

app.use(routes)

app.listen(port, () => console.log(`App listen on port ${port}`))
