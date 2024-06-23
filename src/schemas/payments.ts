import { body, query } from 'express-validator'

export const initiatePaymentsValidationRules = [
  body('amount').notEmpty().isNumeric(),
  body('currency').notEmpty().isString(),
  body('referenceId').notEmpty().isString(),
]

export const verifyPaymentValidationRules = [
  query('paymentIntentId').notEmpty().isString(),
]
