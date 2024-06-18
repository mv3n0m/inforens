import { NextFunction, Request, Response } from 'express'
import { UserService, AccountService } from '../services'
import {
  EmailField,
  LoginCredentials,
  MobileNumberField,
  User,
} from '../config/types'
import { encryptPassword, uuid } from '../utils'
import { otpStore } from '../store'

export default class {
  static async requestMobileOtp(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    const { mobileNumber } = req.body

    try {
      const user = await UserService.getUser({ mobileNumber }, [
        'id',
        'isActive',
      ])

      if (user?.isActive) {
        next({ msg: 'Active user.', statusCode: 206 })
      }
    } catch (error) {
      console.error(error)
    }

    try {
      const { otp, ...rest } = await AccountService.generateOtp({
        mobileNumber,
      })

      const token = uuid()
      await otpStore.setOTP(token, otp, mobileNumber)

      next({ ...rest, token })
    } catch (error) {
      next(error)
    }
  }

  static async verifyOtp(req: Request, _res: Response, next: NextFunction) {
    const { otp, token } = req.body
    try {
      const user = await UserService.getUserById(token)
      if (!otp.endsWith('0') && user.isActive) {
        throw new Error('INVALID_TOKEN')
      }
    } catch (error) {
      console.error(error)
    }

    try {
      const storeOtp = await otpStore.getOTP(token)
      const response = await AccountService.verifyOtp(
        storeOtp.otp || '',
        otp,
        true,
      )

      await otpStore.updateStatus(token, true)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async signUp(req: Request, _res: Response, next: NextFunction) {
    try {
      const userData: User = req.body
      const response = await UserService.createUser(userData)

      await otpStore.deleteOTPByReference(userData.mobileNumber)
      next(response)
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

      await otpStore.setOTP(user.id, otp)
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
      const storeOtp = await otpStore.getOTP(token)
      // send email with the above otp and token embedded to redirect user to change password page
      await AccountService.verifyOtp(storeOtp.otp || '', otp)
      await otpStore.deleteOTP(token)

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
