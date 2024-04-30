import crypto from 'crypto'
import { appSecret } from '../envt'

const algorithm = 'aes-256-cbc'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

export const strongEncrypt = (text: string): string => {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return encrypted.toString('hex')
}

export const strongDecrypt = (text: string): string => {
  let _iv = Buffer.from(iv.toString('hex'), 'hex')
  let encryptedText = Buffer.from(text, 'hex')
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), _iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

export const encrypt = (text: string) =>
  Buffer.from(text, 'binary').toString('base64')

export const decrypt = (text: string) =>
  Buffer.from(text, 'base64').toString('binary')

export const encryptPassword = (password: string) =>
  crypto.pbkdf2Sync(password, appSecret, 1000, 64, `sha512`).toString(`hex`)

export const uuid = (): string => crypto.randomUUID()
