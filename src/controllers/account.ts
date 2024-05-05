import { NextFunction, Request, Response } from 'express'
import { UserService, AccountService } from '../services'
import {
  EmailField,
  LoginCredentials,
  MobileNumberField,
  User,
} from '../config/types'
import { encryptPassword, uuid } from '../utils'
import { sessionStore } from '../store'

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

      const token = uuid()
      sessionStore.setOtp(req, token, otp)
      next({ ...rest, token })
    } catch (error) {
      next(error)
    }
  }

  static async verifyOtp(req: Request, _res: Response, next: NextFunction) {
    try {
      const { otp, token } = req.body

      let user
      if (!otp.endsWith('0')) {
        user = await UserService.getUserById(token)
        if (user.isActive) throw new Error('INVALID_TOKEN')
      }

      const sessionOtp = sessionStore.getOtp(req, token)
      const response = await AccountService.verifyOtp(sessionOtp, otp, !user)
      user && (await UserService.updateUserStatus(token))

      sessionStore.deleteOtp(req, token)
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

      sessionStore.setOtp(req, id, otp)
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

      sessionStore.setOtp(req, user.id, otp)
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
      const { otp, token } = req.body
      const sessionOtp = sessionStore.getOtp(req, token)
      // send email with the above otp and token embedded to redirect user to change password page
      await AccountService.verifyOtp(sessionOtp, otp)
      sessionStore.deleteOtp(req, token)

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
