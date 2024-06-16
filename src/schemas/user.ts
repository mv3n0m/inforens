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

export const userPreferencesValidationRules = [
  body('countryCode').notEmpty().isString(),
  body('regionIds')
    .optional()
    .isArray()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('regionIds must be an array')
      }
      for (const item of value) {
        if (typeof item !== 'number') {
          throw new Error('regionIds must contain only numbers')
        }
      }
      return true
    }),
  body('levelIds')
    .optional()
    .isArray()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('levelIds must be an array')
      }
      for (const item of value) {
        if (typeof item !== 'number') {
          throw new Error('levelIds must contain only numbers')
        }
      }
      return true
    }),
  body('courseIds')
    .optional()
    .isArray()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('courseIds must be an array')
      }
      for (const item of value) {
        if (typeof item !== 'number') {
          throw new Error('courseIds must contain only numbers')
        }
      }
      return true
    }),
  body('universityIds')
    .optional()
    .isArray()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('universityIds must be an array')
      }
      for (const item of value) {
        if (typeof item !== 'number') {
          throw new Error('universityIds must contain only numbers')
        }
      }
      return true
    }),
  body('isActive').optional().isBoolean(),
]

export const userProfileValidationRules = [
  body('gender').optional().isString(),
  body('dateOfBirth').optional().isString(),
  body('countryOfBirth').optional().isString(),
  body('nationality').optional().isString(),
  body('nativeLanguage').optional().isString(),
  body('bio').optional().isString(),
  body('stage').optional().isString(),
  body('otherContacts')
    .optional()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('otherContacts must be an array')
      }
      for (const item of value) {
        if (
          !(item.hasOwnProperty('email') || item.hasOwnProperty('mobileNumber'))
        ) {
          throw new Error(
            'otherContacts must contain either email or mobileNumber.',
          )
        }
      }
      return true
    }),
  body('emergencyContactDetails').optional(),
]
