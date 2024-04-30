import { body, query } from 'express-validator'
import { USER_ROLE } from '../config/enums'

export const createRoleValidationRules = [
  body('name').notEmpty().isString(),
  body('description').optional().isString(),
]
