import express from 'express'
import session from 'express-session'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { notFound, responseHandler } from './middlewares'
import initRoutes from './routes'
import { Sequelize } from 'sequelize'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger'

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

const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: './session.sqlite',
})
const store = new SequelizeStore({
  db: sequelize,
})

app.use(
  session({
    secret: 'secret',
    store,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000, // 10 minutes in milliseconds
    },
  }),
)

store.sync()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

initRoutes(app)

app.use(notFound)
app.use(responseHandler)

export default app
