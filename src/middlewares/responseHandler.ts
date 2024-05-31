import { Request, Response, NextFunction } from 'express'
import { errorCodes } from '../config/constants'
import { IResponsePayload } from '../config/interfaces'
import { logger } from '../utils'

export const responseHandler = (
  payload: IResponsePayload | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (payload instanceof Error) {
    let statusCode = 500
    let errorMessage = payload.message || 'Internal server error'
    if (errorCodes[payload.message]) {
      statusCode = errorCodes[payload.message].statusCode
      errorMessage = errorCodes[payload.message].message
    }
    logger.error(`${statusCode} -> ${errorMessage}`)
    logger.error(payload.stack) // Log the error for debugging purposes

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
