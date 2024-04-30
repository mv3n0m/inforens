import { Types } from '../config'
import { EmailField, MobileNumberField, UserQuery } from '../config/types'
import { UserDbHandler } from '../db/handlers'
import { _jwt, encryptPassword, createOtp, logger } from '../utils'

export default class {
  static async generateOtp(contact: Partial<EmailField & MobileNumberField>) {
    const { email, mobileNumber } = contact
    let otp = createOtp()

    if (mobileNumber) otp = otp.slice(0, 5) + '0'
    if (email && otp.endsWith('0')) otp = otp.slice(0, 5) + '1'

    const msg = `OTP sent to user's ${mobileNumber ? 'WhatsApp' : 'email'}`
    return {
      msg,
      otp,
      // TODO: remove this totp field
      totp: `${otp} - (Temporarily provided for testing purposes)`,
    }
  }

  static async verifyOtp(
    sessionOtp: string | undefined,
    otp: string,
    token?: string,
  ) {
    if (sessionOtp !== otp) throw new Error('INVALID_OTP')
    return {
      msg: `${token ? 'Email' : 'Mobile number'} verified successfully.`,
    }
  }

  static async grantAccess(
    credentials: Types.LoginCredentials,
  ): Promise<{ msg: string; accessToken: string }> {
    const { origin, password, ...contact } = credentials
    const _user: UserQuery | null = await UserDbHandler.getUser(contact, {
      attributes: ['id', 'password', 'isActive'],
    })

    if (!_user) {
      logger.error("User doesn't exist")
      throw new Error('USER_NOT_FOUND')
    }

    if (!_user.isActive) {
      logger.error('User inactive')
      throw new Error('INACTIVE_USER')
    }

    if (_user.password !== encryptPassword(password)) {
      logger.error('Incorrect password')
      throw new Error('INCORRECT_PASSWORD')
    }

    const { id } = _user
    return {
      msg: 'Successful sign-in',
      accessToken: _jwt.createToken({ id, origin }),
    }
  }
}
