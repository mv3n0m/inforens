import { NextFunction, Request, Response } from 'express'
import { AdminService } from '../services'

export default class {
  static async fetchRoles(_req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await AdminService.fetchRoles()
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async createRole(req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await AdminService.createRole({
        isActive: true,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async createCountry(req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await AdminService.createCountry({
        isActive: true,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async createLocation(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await AdminService.createLocation({
        isActive: true,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async createUniversity(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await AdminService.createUniversity({
        isActive: true,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async createLevel(req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await AdminService.createLevel({
        isActive: true,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async createCourse(req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await AdminService.createCourse({
        isActive: true,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }
}
