import { NextFunction, Request, Response } from 'express'
import { AdminService, UserService } from '../services'

export default class {
  static async getUsers(_req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await UserService.getUsers()
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async setUserRole(req: Request, _res: Response, next: NextFunction) {
    try {
      const { token, userRole } = req.body

      await UserService.getUserById(token)

      const role = await AdminService.getRoleByName(userRole)
      if (!role) throw new Error('ROLE_NOT_FOUND')

      const response = await UserService.setUserRole({
        userId: token,
        roleId: role.id,
        userRole,
      })
      await UserService.updateUserStatus(token)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async setUserStage(req: Request, res: Response, next: NextFunction) {
    try {
      const { stage } = req.body

      const userId = res.locals.id
      await UserService.getUserById(userId)

      const response = await UserService.updateUser(userId, { stage })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async setUserPreferences(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.id

      const response = await UserService.setUserPreferences({
        userId,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async getUserPreferences(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.id

      const response = await UserService.getUserPreferences(userId)
      next(response)
    } catch (error) {
      next(error)
    }
  }
}
