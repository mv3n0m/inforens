import { query } from 'express-validator'

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

export const getCoursesValidationRules = [
  query('name').optional().isString(),
  query('levelId').optional().isNumeric(),
  query('universityId').optional().isNumeric(),
]
