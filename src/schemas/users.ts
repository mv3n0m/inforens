import { body, param } from 'express-validator'
import {
  ADDRESS_TAG,
  EXPERIENCE_TAG,
  FILE_TAG,
  MISC_DATA_KEY,
  USER_ROLE,
  USER_STAGE,
} from '../config/enums'
import { emailValidationRule, mobileNumberValidationRule } from './accounts'

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
]

export const userMiscProfileDataValidationRules = [
  param('key')
    .notEmpty()
    .isString()
    .custom((value) => {
      if (value in MISC_DATA_KEY) return true
      throw new Error(
        `Invalid address tag. Options: [${Object.keys(MISC_DATA_KEY)}]`,
      )
    })
    .customSanitizer(
      (value: string) => (MISC_DATA_KEY as Record<string, string>)[value],
    ),
  body('name').optional().isString(),
  emailValidationRule.optional(),
  mobileNumberValidationRule.optional(),
  body('relation').optional().isString(),
  body('relationDuration').optional().isString(),
  body('title').optional().isString(),
  body('position').optional().isString(),
  body('institutionName').optional().isString(),
  body('institutionAddress').optional().isString(),
  body('languageExamTaken').optional().isBoolean(),
  body('StandardizedExamTaken').optional().isBoolean(),
]

export const userAddressValidationRules = [
  body('address1').notEmpty().isString(),
  body('address2').optional().isString(),
  body('countryCode').notEmpty().isString(),
  body('state').notEmpty().isString(),
  body('postCode').notEmpty().isString(),
  body('city').notEmpty().isString(),
  body('tag')
    .notEmpty()
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

export const userEducationValidationRules = [
  body('countryCode').notEmpty().isString(),
  body('regionId').notEmpty().isString(),
  body('location').optional().isString(),
  body('levelId').notEmpty().isNumeric(),
  body('universityId').notEmpty().isNumeric(),
  body('institutionName').optional().isString(),
  body('disciplineId').notEmpty().isNumeric(),
  body('courseName').optional().isString(),
  body('startDate').notEmpty().isString(),
  body('endDate').notEmpty().isString(),
  body('result').optional().isString(),
]

export const userExperienceValidationRules = [
  body('title').notEmpty().isString(),
  body('institutionName').notEmpty().isString(),
  body('institutionAddress').optional().isString(),
  body('startDate').notEmpty().isString(),
  body('endDate').notEmpty().isString(),
  body('tag')
    .notEmpty()
    .isString()
    .custom((value) => {
      if (value in EXPERIENCE_TAG) return true
      throw new Error(
        `Invalid address tag. Options: [${Object.keys(EXPERIENCE_TAG)}]`,
      )
    })
    .customSanitizer(
      (value: string) => (EXPERIENCE_TAG as Record<string, string>)[value],
    ),
]

export const userFileValidationRules = [
  body('tag')
    .notEmpty()
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
