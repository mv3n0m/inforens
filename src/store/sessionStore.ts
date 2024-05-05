import { Request } from 'express'
import { logger } from '../utils'

export function getOtp(req: Request, key: string): string {
  if (!req.session.otps) {
    logger.error('Session OTPs not set yet.')
    throw Error()
  }
  return req.session.otps[key]
}

export function setOtp(req: Request, key: string, value: string) {
  if (!req.session.otps) {
    req.session.otps = {}
  }
  req.session.otps[key] = value
}

export function deleteOtp(req: Request, key: string) {
  if (!req.session.otps) {
    logger.error('Session OTPs not set yet.')
    throw Error()
  }
  delete req.session.otps[key]
}

export function listOtps(req: Request) {
  return req.session.otps
}
