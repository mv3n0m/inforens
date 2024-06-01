import { body, query } from 'express-validator'

export const getLocationsValidationRules = [
  query('countryCode').notEmpty().isString(),
]

export const getUniversitiesValidationRules = [
  query('locationIds')
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
  // query('locationIds').notEmpty().isArray({ min: 1 }),
  // query('locationIds.*').isNumeric(),
  // // query('locationIds').customSanitizer((value) => value.map(Number)),
]

export const getCoursesValidationRules = [
  query('name').optional().isString(),
  query('levelId').optional().isNumeric(),
  query('universityId').optional().isNumeric(),
]
