import { body, param, query } from 'express-validator'
import { USER_STAGE } from '../config/enums'

export const createRoleValidationRules = [
  body('name').notEmpty().isString(),
  body('description').optional().isString(),
]

export const createCountryValidationRules = [
  body('name').notEmpty().isString(),
  body('code').notEmpty().isString(),
  body('isActive').optional().isBoolean(),
]

export const createRegionValidationRules = [
  body('name').notEmpty().isString(),
  body('countryCode').notEmpty().isString(),
  body('isActive').optional().isBoolean(),
]

export const createUniversityValidationRules = [
  body('name').notEmpty().isString(),
  body('regionId').notEmpty().isNumeric(),
  body('address').optional().isString(),
  body('phone').optional().isString(),
  body('email').optional().isString(),
  body('bio').optional().isString(),
  body('estd').optional().isString(),
  body('isActive').optional().isBoolean(),
]

export const createLevelValidationRules = [
  body('name').notEmpty().isString(),
  body('isActive').optional().isBoolean(),
]

export const createDisciplineValidationRules = [
  body('name').notEmpty().isString(),
  body('description').optional().isString(),
  body('isActive').optional().isBoolean(),
]

export const approveGuideValidationRules = [
  body('userId').notEmpty().isString(),
]

export const createSkillValidationRules = [
  body('name').notEmpty().isString(),
  body('description').optional().isString(),
  body('isActive').optional().isBoolean(),
]

export const createLanguageValidationRules = [
  body('name').notEmpty().isString(),
  body('description').optional().isString(),
  body('isActive').optional().isBoolean(),
]

export const createInterestValidationRules = [
  body('name').notEmpty().isString(),
  body('description').optional().isString(),
  body('isActive').optional().isBoolean(),
]

export const createProductValidationRules = [
  body('stage')
    .notEmpty()
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
  body('title').notEmpty().isString(),
  body('discount').optional().isNumeric(),
  body('offerings')
    .notEmpty()
    .isArray()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('offerings must be an array')
      }
      for (const item of value) {
        if (typeof item !== 'string') {
          throw new Error('offerings must contain only strings')
        }
      }
      return true
    }),
  body('price').notEmpty().isNumeric(),
  body('highlighted').optional().isBoolean(),
  body('taskIds')
    .optional()
    .isArray()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('taskIds must be an array')
      }
      for (const item of value) {
        if (typeof item !== 'number') {
          throw new Error('taskIds must contain only numbers')
        }
      }
      return true
    }),
  body('isActive').optional().isBoolean(),
]

export const updateProductValidationRules = [
  param('id').notEmpty().isNumeric(),
  body('stage')
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
  body('title').optional().isString(),
  body('discount').optional().isNumeric(),
  body('offerings')
    .optional()
    .isArray()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('offerings must be an array')
      }
      for (const item of value) {
        if (typeof item !== 'string') {
          throw new Error('offerings must contain only strings')
        }
      }
      return true
    }),
  body('price').optional().isNumeric(),
  body('highlighted').optional().isBoolean(),
  body('isActive').optional().isBoolean(),
]

export const updateProductTasksValidationRules = [
  param('id').notEmpty().isNumeric(),
  body('taskIds')
    .notEmpty()
    .isArray()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('taskIds must be an array')
      }
      for (const item of value) {
        if (typeof item !== 'number') {
          throw new Error('taskIds must contain only numbers')
        }
      }
      return true
    }),
]

export const createTaskValidationRules = [
  body('title').notEmpty().isString(),
  body('description').optional().isString(),
  body('isActive').optional().isBoolean(),
]

export const updateTaskValidationRules = [
  param('id').notEmpty().isNumeric(),
  body('title').optional().isString(),
  body('description').optional().isString(),
  body('isActive').optional().isBoolean(),
]
