import { alphaLower, alphaUpper, numeric, symbolic } from '../config/constants'
import { TEXT_CASING, TEXT_TYPE } from '../config/enums'

export const createOtp = (
  _length: number = 6,
  _type: TEXT_TYPE = TEXT_TYPE.Numeric,
  _casing: TEXT_CASING = TEXT_CASING.Lower,
) => {
  let characters = ''
  if (
    [TEXT_TYPE.Numeric, TEXT_TYPE.Alphanumeric, TEXT_TYPE.All].includes(_type)
  ) {
    characters += numeric
  }
  if ([TEXT_TYPE.Symbolic, TEXT_TYPE.All].includes(_type)) {
    characters += symbolic
  }
  if (
    [TEXT_TYPE.Alphabetic, TEXT_TYPE.Alphanumeric, TEXT_TYPE.All].includes(
      _type,
    )
  ) {
    if ([TEXT_CASING.Lower, TEXT_CASING.Mixed].includes(_casing)) {
      characters += alphaLower
    }
    if ([TEXT_CASING.Upper, TEXT_CASING.Mixed].includes(_casing)) {
      characters += alphaUpper
    }
  }

  let otp = ''

  for (let i = 0; i < _length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    otp += characters[randomIndex]
  }

  return otp
}
