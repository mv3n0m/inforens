import express from 'express'
import { AdminController } from '../controllers'
import {
  createCountryValidationRules,
  createLocationValidationRules,
  createRoleValidationRules,
} from '../schemas/admin'
import validator from '../middlewares/validator'

const router = express.Router()

router.get('/roles', AdminController.fetchRoles)
router.post(
  '/roles',
  createRoleValidationRules,
  validator,
  AdminController.createRole,
)

router.post(
  '/countries',
  createCountryValidationRules,
  validator,
  AdminController.createCountry,
)

router.post(
  '/locations',
  createLocationValidationRules,
  validator,
  AdminController.createLocation,
)

export default router
