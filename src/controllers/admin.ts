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
        ...req.body,
        isActive: true,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async createCountry(req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await AdminService.createCountry({
        ...req.body,
        isActive: true,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  // static async updateUserRole(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     console.log(res.locals)
  //     const { token, userRole } = req.body

  //     // console.log(req.user)
  //     // const response = await UserService.getUsers()
  //     next({ msg: 'test' })
  //   } catch (error) {
  //     next(error)
  //   }
  // }
  // async updateUser(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { user = { sub: '' }, body } = req
  //     const response = await userService.updateUser(user, body)
  //     return ResponseHandler.sendSuccess(res, response)
  //   } catch (error) {
  //     return next(error)
  //   }
  // }
}
