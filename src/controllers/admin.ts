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

  static async createRegion(req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await AdminService.createRegion({
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

  static async createDiscipline(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await AdminService.createDiscipline({
        isActive: true,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async createSkill(req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await AdminService.createSkill({
        isActive: true,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async createLanguage(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await AdminService.createLanguage({
        isActive: true,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async createInterest(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await AdminService.createInterest({
        isActive: true,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async createProduct(req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await AdminService.createProduct({
        isActive: true,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async updateProduct(req: Request, _res: Response, next: NextFunction) {
    try {
      const productId = req.params.id
      const response = await AdminService.updateProductTasks(
        +productId,
        req.body,
      )
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async updateProductTasks(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const productId = req.params.id
      const response = await AdminService.updateProductTasks(
        +productId,
        req.body.taskIds,
      )
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async createTask(req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await AdminService.createTask({
        isActive: true,
        ...req.body,
      })
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async updateTask(req: Request, _res: Response, next: NextFunction) {
    try {
      const taskId = req.params.id
      const response = await AdminService.updateTask(+taskId, req.body)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async approveGuide(req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await AdminService.approveGuide(req.body.userId)
      next(response)
    } catch (error) {
      next(error)
    }
  }
}
