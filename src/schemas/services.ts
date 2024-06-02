import { body } from 'express-validator'
import { RECOMMENDATION_KEYS } from '../config/enums'

export const getRecommendationsValidationRules = [
  body('key')
    .optional()
    .isString()
    .custom((value) => {
      if (value in RECOMMENDATION_KEYS) return true
      throw new Error(
        `Invalid recommendation key. Options: [${Object.keys(
          RECOMMENDATION_KEYS,
        )}]`,
      )
    }),
]
