import { NextFunction, Request, Response } from 'express'
import { AdminService, UserService } from '../services'

export default class {
  static async getRecommendations(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const userRoles = await UserService.getApprovedGuides()

      const response = userRoles
      next(response)
    } catch (error) {
      next(error)
    }
  }
}
