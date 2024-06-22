import { body } from 'express-validator'
import { validateEmail } from './accounts'

export const guideProfileCreateValidationRules = [
  body('universityEmail').notEmpty().isEmail().custom(validateEmail),
  body('countryCode').notEmpty().isString(),
  body('universityId').notEmpty().isNumeric(),
  body('levelId').notEmpty().isNumeric(),
  body('disciplineId').notEmpty().isNumeric(),
  body('courseName').notEmpty().optional().isString(),
  body('yearOfCompletion').notEmpty().isNumeric(),
]

export const guideProfileUpdateValidationRules = [
  body('introVidUrl').notEmpty().optional().isString(),
  body('aboutMe').notEmpty().optional().isString(),
  body('skillIds')
    .optional()
    .isArray()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('skillIds must be an array')
      }
      for (const item of value) {
        if (typeof item !== 'number') {
          throw new Error('skillIds must contain only numbers')
        }
      }
      return true
    }),
  body('languageIds')
    .optional()
    .isArray()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('languageIds must be an array')
      }
      for (const item of value) {
        if (typeof item !== 'number') {
          throw new Error('languageIds must contain only numbers')
        }
      }
      return true
    }),
  body('interestIds')
    .optional()
    .isArray()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('interestIds must be an array')
      }
      for (const item of value) {
        if (typeof item !== 'number') {
          throw new Error('interestIds must contain only numbers')
        }
      }
      return true
    }),
]
