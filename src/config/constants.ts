export const alphaUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const alphaLower = 'abcdefghijklmnopqrstuvwxyz'
export const symbolic = '!@#$%^&*()_+-=[]{}|;:,.<>?'
export const numeric = '0123456789'

export const errorCodes: Record<
  string,
  {
    statusCode: number
    message: string
  }
> = {
  USER_EXISTS: {
    statusCode: 400,
    message: 'User already exists',
  },
  USER_NOT_FOUND: {
    statusCode: 400,
    message: 'User not found',
  },
  EMAIL_OR_MOBILE: {
    statusCode: 400,
    message: 'Either email or mobileNumber required.',
  },
  INCORRECT_PASSWORD: {
    statusCode: 401,
    message: 'Incorrect password',
  },
  INVALID_REQUEST_BODY: {
    statusCode: 400,
    message: 'Invalid request body',
  },
  TOKEN_MISSING: {
    statusCode: 400,
    message: 'Token not provided',
  },
  INVALID_TOKEN: {
    statusCode: 400,
    message: 'Token is invalid',
  },
  INVALID_OTP: {
    statusCode: 400,
    message: 'OTP is invalid',
  },
  INACTIVE_USER: {
    statusCode: 401,
    message: 'User is not active',
  },
  ROLE_NOT_FOUND: {
    statusCode: 400,
    message: 'Role is invalid',
  },
  ROLE_EXISTS: {
    statusCode: 400,
    message: 'Role already exists',
  },
  COUNTRY_EXISTS: {
    statusCode: 400,
    message: 'Country already exists',
  },
  LOCATION_EXISTS: {
    statusCode: 400,
    message: 'Location already exists',
  },
  UNIVERSITY_EXISTS: {
    statusCode: 400,
    message: 'University already exists',
  },
  USERROLE_ALREADY_SET: {
    statusCode: 400,
    message: 'User role set already',
  },
  '': {
    statusCode: 500,
    message: 'Something went wrong',
  },
}
