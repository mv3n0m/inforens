import { NextFunction, Request, Response } from 'express'
import { AdminService, GuideService, UserService } from '../services'

export default class {
  static async getGuides(_req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await UserService.getUsers()
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async getGuideProfile(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.id
      const user = await GuideService.getGuideProfile(userId)

      next(user)
    } catch (error) {
      next(error)
    }
  }

  static async createGuideProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.id

      const response = await GuideService.createGuideProfile({
        userId,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async updateGuideProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.id

      const response = await GuideService.updateGuideProfile(userId, req.body)
      next(response)
    } catch (error) {
      next(error)
    }
  }
}
