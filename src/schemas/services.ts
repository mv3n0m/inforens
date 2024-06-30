import { query } from 'express-validator'
import { RECOMMENDATION_KEYS } from '../config/enums'

export const getRecommendationsValidationRules = [
  query('key')
    .optional()
    .isString()
    .custom((value) => {
      if (value in RECOMMENDATION_KEYS) return true
      throw new Error(
        `Invalid recommendation key. Options: [${Object.keys(
          RECOMMENDATION_KEYS,
        )}]`,
      )
    })
    .customSanitizer(
      (value: string) => (RECOMMENDATION_KEYS as Record<string, string>)[value],
    ),
]
