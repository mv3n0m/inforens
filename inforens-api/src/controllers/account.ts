import { NextFunction, Request, Response } from 'express'
import { UserService, AccountService } from '../services'
import {
  EmailField,
  LoginCredentials,
  MobileNumberField,
  User,
} from '../config/types'
import { encryptPassword } from '../utils'

export default class {
  static async requestMobileOtp(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const { mobileNumber } = req.body
      const response = await AccountService.generateOtp({ mobileNumber })
      const { otp, ...rest } = response

      req.session.otp = otp
      next(rest)
    } catch (error) {
      next(error)
    }
  }

  static async verifyOtp(req: Request, _res: Response, next: NextFunction) {
    try {
      const sessionOtp = req.session.otp
      const { otp, token } = req.body
      const response = await AccountService.verifyOtp(sessionOtp, otp, token)

      if (!otp.endsWith('0')) {
        if (token) {
          const user = await UserService.getUserById(token)
          if (user.isActive) throw new Error('INVALID_TOKEN')
          await UserService.updateUserStatus(token)
        } else {
          throw new Error('TOKEN_MISSING')
        }
      }

      delete req.session.otp
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async signUp(req: Request, _res: Response, next: NextFunction) {
    try {
      const userData: User = req.body
      const response = await UserService.createUser(userData)
      const { otp, id, ...rest } = response

      req.session.otp = otp
      next({ ...rest, token: id, statusCode: 201 })
    } catch (error) {
      next(error)
    }
  }

  static async signIn(req: Request, _res: Response, next: NextFunction) {
    try {
      const credentials: LoginCredentials = req.body
      const response = await AccountService.grantAccess(credentials)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async resetPassword(req: Request, _res: Response, next: NextFunction) {
    try {
      const body: EmailField | MobileNumberField = req.body
      const user = await UserService.getUser(body)

      const response = await AccountService.generateOtp(body)
      const { otp, ...rest } = response

      req.session.otp = otp
      next({ ...rest, token: user.id })
    } catch (error) {
      next(error)
    }
  }

  static async confirmResetRequest(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const sessionOtp = req.session.otp
      const { otp, token } = req.body
      console.log('token', token)
      // send email with the above otp embedded to redirect user to change password page
      await AccountService.verifyOtp(sessionOtp, otp)
      delete req.session.otp

      next({ msg: 'Password reset request confirmed.' })
    } catch (error) {
      next(error)
    }
  }

  static async changePassword(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const { token, password } = req.body
      await UserService.updateUser(token, {
        password: encryptPassword(password),
      })
      next({ msg: 'User password updated successfully' })
    } catch (error) {
      next(error)
    }
  }
}
