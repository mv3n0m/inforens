import { NextFunction, Request, Response } from 'express'
import { AdminService, UserService } from '../services'
import { uploadFileToS3 } from '../utils/awsHelpers'
import { FILE_TAG } from '../config/enums'

export default class {
  static async getUsers(_req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await UserService.getUsers()
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async getUserBasicInfo(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.id
      const user = await UserService.getUserById(userId)

      const userFiles: any = await UserService.getUserFiles(userId, {
        tag: FILE_TAG.ProfileImg,
      })
      const profileImgUrl = userFiles.count ? userFiles.rows[0].signedUrl : ''

      next({ user, profileImgUrl, emailVerified: false })
    } catch (error) {
      next(error)
    }
  }

  static async setUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { userRole } = req.body

      const userId = res.locals.id
      await UserService.getUserById(userId)

      const role = await AdminService.getRoleByName(userRole)
      if (!role) throw new Error('ROLE_NOT_FOUND')

      const response = await UserService.setUserRole({
        userId,
        roleId: role.id,
        userRole,
      })
      await UserService.updateUserStatus(userId)
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

      const response = await UserService.updateUserProfile(userId, { stage })
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
    _req: Request,
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

  static async updateUserPreferences(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.id

      const response = await UserService.updateUserPreferences(userId, req.body)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async updateUserProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.id

      const response = await UserService.updateUserProfile(userId, req.body)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async getUserProfile(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.id

      const response = {
        ...(await UserService.getUserById(userId)),
        ...(await UserService.getUserProfile(userId)),
      }
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async updateUserFile(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return res.status(400).json({ error: 'File is required' })
    }

    try {
      const userId = res.locals.id

      const response = await UserService.updateUserFile(req.file, {
        userId,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async getUserFiles(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.id

      const response = await UserService.getUserFiles(userId, req.params as any)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async addUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.id

      const response = await UserService.addUserAddress({
        userId,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async updateUserAddress(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.id
      const id = req.params.id

      const response = await UserService.updateUserAddress(
        +id,
        userId,
        req.body,
      )
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async getUserAddresses(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.id

      const response = await UserService.getUserAddresses(userId)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async addUserEducation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.id

      const response = await UserService.addUserEducation({
        userId,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async updateUserEducation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.id
      const id = req.params.id

      const response = await UserService.updateUserEducation(
        +id,
        userId,
        req.body,
      )
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async getUserEducations(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.id

      const response = await UserService.getUserEducations(userId)
      next(response)
    } catch (error) {
      next(error)
    }
  }
}
