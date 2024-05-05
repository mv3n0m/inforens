import express from 'express'
import session from 'express-session'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import {
  // notFound,
  responseHandler,
} from './middlewares'
import initRoutes from './routes'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('combined'))

declare module 'express-session' {
  interface SessionData {
    otps: Record<string, string>
  }
}

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000, // 10 minutes in milliseconds
    },
  }),
)

initRoutes(app)

// app.use(notFound)
app.use(responseHandler)

export default app
