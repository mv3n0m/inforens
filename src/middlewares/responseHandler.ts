import { Request, Response, NextFunction } from 'express'
import { errorCodes, sqlErrorCodes } from '../config/constants'
import { IResponsePayload } from '../config/interfaces'
import { logger } from '../utils'

export const responseHandler = (
  payload: IResponsePayload | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (payload instanceof Error) {
    const { message, name } = payload
    let statusCode = 500
    let errorMessage = message || 'Internal server error'
    if (message && errorCodes[message]) {
      statusCode = errorCodes[message].statusCode
      errorMessage = errorCodes[message].message
    } else if (name) {
      statusCode = 400
      errorMessage = sqlErrorCodes[name]?.message || name
    }
    logger.error(`${statusCode} -> ${errorMessage}`)
    logger.error('traceback -> ', payload)

    return res.status(statusCode).json({ msg: errorMessage })
  } else {
    const { refreshedToken } = res.locals
    let { statusCode, ...response } = payload

    if (refreshedToken) response = { ...response, accessToken: refreshedToken }
    return res.status(statusCode || 200).json(response)
  }
}

export const notFound = (_req: Request, res: Response) => {
  return res.status(404).json({ msg: 'Not Found' })
}
