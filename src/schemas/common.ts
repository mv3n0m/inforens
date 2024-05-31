import { body, query } from 'express-validator'

export const getLocationsValidationRules = [
  query('countryCode').notEmpty().isString(),
]
