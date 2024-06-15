import { NextFunction, Request, Response } from 'express'
import { CommonService } from '../services'

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

  static async fetchRegions(req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await CommonService.fetchRegions(
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
        req.query.regionIds as any,
      )
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async fetchLevels(_req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await CommonService.fetchLevels()
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async fetchCourses(req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await CommonService.fetchCourses(req.query)
      next(response)
    } catch (error) {
      next(error)
    }
  }
}
