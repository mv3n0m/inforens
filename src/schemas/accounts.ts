import { body } from 'express-validator'

const validateMobileNumber = (value: string) => {
  const mobileNumberRegex = /^\+\d{1,2}([ -]?)\d{1,4}\s\d{6,14}$/
  if (!mobileNumberRegex.test(value)) {
    throw new Error(
      'Invalid mobile number format. Use +<countryCode><space><mobileNumber>',
    )
  }
  return true
}

const validateEmail = (value: string) => {
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(value)) {
    throw new Error('Invalid email format.')
  }
  return true
}

export const mobileNumberValidationRule = body('mobileNumber')
  .notEmpty()
  .isString()
  .custom(validateMobileNumber)

const tokenValidationRule = body('token').notEmpty().isString()

export const emailValidationRule = body('email')
  .notEmpty()
  .custom(validateEmail)
export const passwordValidationRule = body('password').notEmpty().isString()
export const verifyOtpValidationRules = [
  body('otp').notEmpty().isString(),
  tokenValidationRule,
]

export const changePasswordValidationRules = [
  tokenValidationRule,
  passwordValidationRule,
]

export const signUpValidationRules = [
  body('firstName').notEmpty().isString(),
  body('lastName').notEmpty().isString(),
  emailValidationRule,
  mobileNumberValidationRule,
  passwordValidationRule,
]

export const signInValidationRules = [
  emailValidationRule.optional(),
  mobileNumberValidationRule.optional(),
  passwordValidationRule,
  body('origin').notEmpty().isString(),
]

export const resetPasswordValidationRules = [
  emailValidationRule.optional(),
  mobileNumberValidationRule.optional(),
]

// body()
//   .isJSON()
//   .custom((value) => {
//     const { email, mobileNumber, password, origin, ...rest } = value
//     const restKeys = Object.keys(rest)
//     if (restKeys?.length) throw new Error(`Invalid key/s: [${restKeys}]`)
//     if (!(email || mobileNumber))
//       throw new Error('Either `email` or `mobileNumber` required')
//     if (email) validateEmail(email)
//     if (mobileNumber) validateMobileNumber(mobileNumber)
//     if (!password.length) throw new Error('No password provided.')
//     if (origin && !origin.length)
//       throw new Error('Origin cannot be empty string')
//     return true
//   })
