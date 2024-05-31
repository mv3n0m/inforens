import { body } from 'express-validator'

export const createRoleValidationRules = [
  body('name').notEmpty().isString(),
  body('description').optional().isString(),
]

export const createCountryValidationRules = [
  body('name').notEmpty().isString(),
  body('code').notEmpty().isString(),
  body('isActive').isBoolean().optional(),
]

export const createLocationValidationRules = [
  body('name').notEmpty().isString(),
  body('countryCode').notEmpty().isString(),
  body('isActive').isBoolean().optional(),
]
