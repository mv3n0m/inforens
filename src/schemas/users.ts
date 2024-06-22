import { body } from 'express-validator'
import { ADDRESS_TAG, FILE_TAG, USER_ROLE, USER_STAGE } from '../config/enums'

export const setUserRoleValidationRules = [
  body('userRole')
    .notEmpty()
    .isString()
    .custom((value) => {
      if (value in USER_ROLE) return true
      throw new Error(`Invalid role. Options: [${Object.keys(USER_ROLE)}]`)
    }),
]

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
  body('disciplineIds')
    .optional()
    .isArray()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('disciplineIds must be an array')
      }
      for (const item of value) {
        if (typeof item !== 'number') {
          throw new Error('disciplineIds must contain only numbers')
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

export const userAddressValdiationRules = [
  body('address1').isString(),
  body('address2').optional().isString(),
  body('countryCode').isString(),
  body('state').isString(),
  body('postCode').isString(),
  body('city').isString(),
  body('tag')
    .isString()
    .custom((value) => {
      if (value in ADDRESS_TAG) return true
      throw new Error(
        `Invalid address tag. Options: [${Object.keys(ADDRESS_TAG)}]`,
      )
    })
    .customSanitizer(
      (value: string) => (ADDRESS_TAG as Record<string, string>)[value],
    ),
]

export const userFileValidationRules = [
  body('tag')
    .isString()
    .isString()
    .custom((value) => {
      if (value in FILE_TAG) return true
      throw new Error(
        `Invalid address tag. Options: [${Object.keys(FILE_TAG)}]`,
      )
    })
    .customSanitizer(
      (value: string) => (FILE_TAG as Record<string, string>)[value],
    ),
]
