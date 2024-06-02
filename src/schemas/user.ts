import { body } from 'express-validator'
import { USER_STAGE } from '../config/enums'

export const setUserStageValidationRules = [
  body('stage')
    .notEmpty()
    .isString()
    .custom((value) => {
      if (value in USER_STAGE) return true
      throw new Error(`Invalid stage. Options: [${Object.keys(USER_STAGE)}]`)
    })
    .customSanitizer(
      (value: string) => (USER_STAGE as Record<string, string>)[value],
    ),
]

export const setUserPreferencesValidationRules = [
  body('countryCode').notEmpty().isString(),
  body('locationIds')
    .notEmpty()
    .isArray()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('locationIds must be an array')
      }
      for (const item of value) {
        if (typeof item !== 'number') {
          throw new Error('locationIds must contain only numbers')
        }
      }
      return true
    }),
  body('levelId').notEmpty().isNumeric(),
  body('courseId').notEmpty().isNumeric(),
  body('universityId').notEmpty().isNumeric(),
  body('isActive').optional().isBoolean(),
]
