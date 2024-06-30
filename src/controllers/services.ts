import { NextFunction, Request, Response } from 'express'
import { ProductsService, UserService } from '../services'
import { RECOMMENDATION_KEYS } from '../config/enums'

export default class {
  static async getRecommendations(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = res.locals.id
      const { key = RECOMMENDATION_KEYS.Guides } = req.query

      let response

      if (key === RECOMMENDATION_KEYS.Guides) {
        response = await UserService.getApprovedGuides()
      } else if (key === RECOMMENDATION_KEYS.Products) {
        const userProfile = await UserService.getUserProfile(userId)

        let criteria = {}
        if (userProfile?.stage) {
          criteria = { stage: userProfile.stage }
        }
        response = await ProductsService.getProductsAndTasks(criteria)
      }

      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async getProducts(req: Request, _res: Response, next: NextFunction) {
    try {
      const products = await ProductsService.getProductsAndTasks(req.query)

      next(products)
    } catch (error) {
      next(error)
    }
  }
}
