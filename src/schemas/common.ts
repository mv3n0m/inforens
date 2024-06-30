import { body, query } from 'express-validator'
import { USER_STAGE } from '../config/enums'

export const getRegionsValidationRules = [
  query('countryCode').notEmpty().isString(),
]

export const getUniversitiesValidationRules = [
  query('countryCode').optional().notEmpty().isString(),
  query('regionIds')
    .optional()
    .custom((value) => {
      const numbersArray = value.split(',')
      if (numbersArray.length === 0) {
        throw new Error('array must not be empty')
      }
      for (const num of numbersArray) {
        if (isNaN(num)) {
          throw new Error('must contain only numeric values')
        }
      }
      return true
    })
    .customSanitizer((value) => value.split(',').map(Number)),

  // query('regionIds').notEmpty().isArray({ min: 1 }),
  // query('regionIds.*').isNumeric(),
  // // query('regionIds').customSanitizer((value) => value.map(Number)),
]

export const getProductsValidationRules = [
  query('stage')
    .optional()
    .isString()
    .custom((value) => {
      if (value in USER_STAGE) return true
      throw new Error(
        `Invalid address tag. Options: [${Object.keys(USER_STAGE)}]`,
      )
    })
    .customSanitizer(
      (value: string) => (USER_STAGE as Record<string, string>)[value],
    ),
]

export const getTasksValidationRules = [
  query('taskIds')
    .optional()
    .custom((value) => {
      const numbersArray = value.split(',')
      if (numbersArray.length === 0) {
        throw new Error('array must not be empty')
      }
      for (const num of numbersArray) {
        if (isNaN(num)) {
          throw new Error('must contain only numeric values')
        }
      }
      return true
    })
    .customSanitizer((value) => value.split(',').map(Number)),
]
