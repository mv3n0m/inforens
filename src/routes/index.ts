import { Express } from 'express'
import { baseUrl } from '../envt'
import accountRouter from './accounts'
import userRouter from './users'
import adminRouter from './admin'
import commonRouter from './common'
import { authenticate } from '../middlewares'

const publicRoutes = {
  '/accounts': accountRouter,
  '/common': commonRouter,
}

const privateRoutes = {
  '/users': userRouter,
}

const protectedRoutes = {
  '/admin': adminRouter,
}

export default function initRoutes(app: Express) {
  Object.entries(protectedRoutes).forEach(([k, v]) =>
    app.use(`${baseUrl}${k}`, v),
  )
  Object.entries(publicRoutes).forEach(([k, v]) => app.use(`${baseUrl}${k}`, v))

  Object.entries(privateRoutes).forEach(([k, v]) =>
    app.use(`${baseUrl}${k}`, authenticate, v),
  )

  // app.use(authorize)
  // Object.entries(protectedRoutes).forEach(([k, v]) =>
  //   app.use(`${baseUrl}${k}`, v),
  // )
}
