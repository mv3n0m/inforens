import { NextFunction, Request, Response } from 'express'
import { AdminService, UserService } from '../services'
import { USER_ROLE } from '../config/enums'

export default class {
  static async getUsers(_req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await UserService.getUsers()
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async setUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(res.locals)
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

// export default new AccountController()
