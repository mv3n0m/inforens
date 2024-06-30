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
      const response = await CommonService.fetchUniversities(req.query as any)
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

  static async fetchDisciplines(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await CommonService.fetchDisciplines()
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async fetchSkills(_req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await CommonService.fetchSkills()
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async fetchLanguages(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await CommonService.fetchLanguages()
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async fetchInterests(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await CommonService.fetchInterests()
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async fetchProducts(req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await CommonService.fetchProducts(req.query)
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async fetchTasks(req: Request, _res: Response, next: NextFunction) {
    try {
      const { taskIds } = req.query

      const response = await CommonService.fetchTasks(
        taskIds ? { id: taskIds } : {},
      )
      next(response)
    } catch (error) {
      next(error)
    }
  }
}
