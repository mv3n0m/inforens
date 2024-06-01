import { NextFunction, Request, Response } from 'express'
import { AdminService, CommonService } from '../services'

export default class {
  static async fetchCountries(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await CommonService.fetchCountries()
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async fetchLocations(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await CommonService.fetchLocations(
        req.query.countryCode as string,
      )
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async fetchUniversities(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await CommonService.fetchUniversities(
        req.query.locationIds as any,
      )
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async fetchLevels(req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await CommonService.fetchLevels()
      next(response)
    } catch (error) {
      next(error)
    }
  }
}
