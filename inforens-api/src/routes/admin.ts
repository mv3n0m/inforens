import express from 'express'
import { AdminController } from '../controllers'
import { createRoleValidationRules } from '../schemas/admin'
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

export default router
