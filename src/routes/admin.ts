import express from 'express'
import { AdminController } from '../controllers'
import {
  createCountryValidationRules,
  createLevelValidationRules,
  createLocationValidationRules,
  createRoleValidationRules,
  createUniversityValidationRules,
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

router.post(
  '/universities',
  createUniversityValidationRules,
  validator,
  AdminController.createUniversity,
)

router.post(
  '/levels',
  createLevelValidationRules,
  validator,
  AdminController.createLevel,
)

export default router
