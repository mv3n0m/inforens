import express from 'express'
import { PaymentsController } from '../controllers'
import {
  verifyPaymentValidationRules,
  initiatePaymentsValidationRules,
} from '../schemas/payments'
import validator from '../middlewares/validator'
import { authenticate } from '../middlewares'

const router = express.Router()

const stripeRouter = express.Router()

/**
 * @swagger
 * /payments/stripe/initiate:
 *   post:
 *     summary: Initiate a stripe payment
 *     tags:
 *       - Payments
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *               referenceId:
 *                 type: string
 *             required:
 *               - amount
 *               - currency
 *               - referenceId
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
stripeRouter.post(
  '/initiate',
  authenticate,
  initiatePaymentsValidationRules,
  validator,
  PaymentsController.initiatePayment,
)

/**
 * @swagger
 * /payments/stripe/status:
 *   get:
 *     summary: Check status of a stripe payment
 *     tags:
 *       - Payments
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: query
 *         name: paymentIntentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 */
stripeRouter.get(
  '/status',
  authenticate,
  verifyPaymentValidationRules,
  validator,
  PaymentsController.verifyStatus,
)

stripeRouter.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  PaymentsController.stripeWebhook,
)

router.use('/stripe', stripeRouter)

export default router
