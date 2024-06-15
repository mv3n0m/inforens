import { body } from 'express-validator'

export const createRoleValidationRules = [
  body('name').notEmpty().isString(),
  body('description').optional().isString(),
]

export const createCountryValidationRules = [
  body('name').notEmpty().isString(),
  body('code').notEmpty().isString(),
  body('isActive').optional().isBoolean(),
]

export const createRegionValidationRules = [
  body('name').notEmpty().isString(),
  body('countryCode').notEmpty().isString(),
  body('isActive').optional().isBoolean(),
]

export const createUniversityValidationRules = [
  body('name').notEmpty().isString(),
  body('regionId').notEmpty().isNumeric(),
  body('address').optional().isString(),
  body('phone').optional().isString(),
  body('email').optional().isString(),
  body('bio').optional().isString(),
  body('estd').optional().isString(),
  body('isActive').optional().isBoolean(),
]

export const createLevelValidationRules = [
  body('name').notEmpty().isString(),
  body('isActive').optional().isBoolean(),
]

export const createCourseValidationRules = [
  body('name').notEmpty().isString(),
  body('code').optional().isString(),
  body('levelId').notEmpty().isNumeric(),
  body('description').optional().isString(),
  body('isActive').optional().isBoolean(),
]

export const approveGuideValidationRules = [
  body('userId').notEmpty().isString(),
]
