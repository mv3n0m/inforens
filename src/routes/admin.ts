import express from 'express'
import { AdminController } from '../controllers'
import {
  createCountryValidationRules,
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
// router.post('/update-user-role', UserController.updateUserRole)

router.post(
  '/countries',
  createCountryValidationRules,
  validator,
  AdminController.createCountry,
)

export default router
