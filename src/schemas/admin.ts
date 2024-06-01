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

export const createUniversityValidationRules = [
  body('name').notEmpty().isString(),
  body('locationId').notEmpty().isNumeric(),
  body('isActive').isBoolean().optional(),
  body('address').notEmpty().isString().optional(),
  body('phone').notEmpty().isString().optional(),
  body('email').notEmpty().isString().optional(),
  body('bio').notEmpty().isString().optional(),
  body('estd').notEmpty().isString().optional(),
]

export const createLevelValidationRules = [
  body('name').notEmpty().isString(),
  body('isActive').isBoolean().optional(),
]
