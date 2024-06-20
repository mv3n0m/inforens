import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { notFound, responseHandler } from './middlewares'
import initRoutes from './routes'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('combined'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

initRoutes(app)

app.use(notFound)
app.use(responseHandler)

export default app
