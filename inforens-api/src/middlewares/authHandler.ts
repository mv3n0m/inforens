// import { UserStatus } from "../config/enums";
// import { UserDBService } from "../database";
import { NextFunction, Request, Response } from 'express'
import { _jwt, logger } from '../utils'

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization
  if (!token) {
    return next({ msg: 'No token provided', statusCode: 401 })
  }
  try {
    const id = _jwt.verifyToken(token)
    res.locals.id = id
    next()
  } catch (error: any) {
    const msg = error.message
    if (msg === 'jwt expired') {
      const refreshed = _jwt.refreshToken(token)
      if (refreshed) {
        res.locals = refreshed
        return next()
      }
    }

    console.log(error)
    logger.error(`Error in authenticate middleware: ${msg}`)
    return next({ msg, statusCode: 401 })
  }
}

// export const authorize = async (req: any, res: any, next: any) => {
//   const { user = { sub: '' } } = req
//   try {
//     const { sub } = user
//     const userInDB = await UserDBService.getUserByCognitoId(sub, {
//       attributes: [
//         'id',
//         'status',
//         'role',
//         'type',
//         'email',
//         'firstName',
//         'lastName',
//         'phoneNumber',
//         'walletAddress',
//         'enabledChains'
//       ]
//     })
//     if (!userInDB) {
//       return ResponseHandler.sendError(res, 'User not found', 401)
//     }
//     if (userInDB.status !== UserStatus.Active) {
//       return ResponseHandler.sendError(res, 'User is not active', 401)
//     }
//     req.user = {
//       sub,
//       id: userInDB.id,
//       role: userInDB.role,
//       type: userInDB.type,
//       email: userInDB.email,
//       firstName: userInDB.firstName,
//       lastName: userInDB.lastName,
//       phoneNumber: userInDB.phoneNumber,
//       enabledChains: userInDB.enabledChains,
//       walletAddress: userInDB.walletAddress
//     }
//     next()
//   } catch (error: any) {
//     logger.error(`Error in authorize middleware: ${error.message}`)
//     return ResponseHandler.sendError(res, error.message, 401)
//   }
// }
