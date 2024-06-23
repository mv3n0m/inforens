import { NextFunction, Request, Response } from 'express'
import { PaymentsService } from '../services'

export default class {
  static async initiatePayment(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const { amount, currency } = req.body
      const response = await PaymentsService.createPaymentIntent(
        amount,
        currency,
      )
      next({
        paymentToken: response.client_secret,
        paymentIntentId: response.id,
      })
    } catch (error) {
      next(error)
    }
  }

  static async verifyStatus(req: Request, _res: Response, next: NextFunction) {
    try {
      const response = await PaymentsService.confirmPayment(
        req.query.paymentIntentId as string,
      )
      next(response)
    } catch (error) {
      next(error)
    }
  }

  static async stripeWebhook(req: Request, _res: Response, next: NextFunction) {
    try {
      const sig = req.headers['stripe-signature']
      await PaymentsService.webhook(req.body, sig)

      next({ statusCode: 204 })
    } catch (error) {
      next(error)
    }
  }
}
