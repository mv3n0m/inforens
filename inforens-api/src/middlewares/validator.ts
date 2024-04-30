import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { removeDuplicates } from '../utils'

export default function (req: Request, _res: Response, next: NextFunction) {
  const errors = validationResult(req)
  console.log(errors)
  if (errors.isEmpty()) {
    return next()
  }
  next({
    msg: 'Validation Error',
    statusCode: 400,
    errors: removeDuplicates(errors.array()),
  })
}
