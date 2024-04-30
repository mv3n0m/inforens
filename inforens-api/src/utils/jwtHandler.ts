import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'
import { Origin, UserQuery } from '../config/types'
import { appSecret, jwtExpiry, jwtRefreshWindow } from '../envt'
import { TOKEN_TYPE } from '../config/enums'
import { decrypt, encrypt } from './cryptographer'

class JwtHandler {
  constructor() {}

  createToken(
    userData: Partial<UserQuery & Origin>,
    _type: TOKEN_TYPE = TOKEN_TYPE.Access,
  ): string {
    const { id, ...rest } = userData
    const expiresIn = 60 * +jwtExpiry

    return jwt.sign({ _type, ...rest }, appSecret, {
      expiresIn,
      subject: encrypt(`${id!}`),
    })
  }

  decodeToken(accessToken: string): Jwt {
    const decoded = jwt.decode(accessToken, { complete: true })
    if (!decoded) throw new Error('Token error')
    return decoded
  }

  verifyToken(
    accessToken: string,
    _type: TOKEN_TYPE = TOKEN_TYPE.Access,
  ): string {
    const verified = jwt.verify(accessToken, appSecret) as JwtPayload

    if (!verified) throw new Error('Invalid token')
    if (verified._type !== _type) throw new Error('Invalid token type')

    return decrypt(verified.sub!)
  }

  refreshToken(accessToken: string) {
    const token = this.decodeToken(accessToken)
    const { exp, iat, _type, sub, ...rest } = token.payload as JwtPayload

    const expected = new Date()
    const expiry = new Date(exp! * 1000)
    expected.setMinutes(expected.getMinutes() - +jwtRefreshWindow)

    if (expiry <= expected) return

    const id = decrypt(sub!)
    const userData = { ...rest, id }
    return { refreshedToken: this.createToken(userData, _type), id }
  }

  // TODO: revoke token requires internal db or something
}

export default new JwtHandler()
