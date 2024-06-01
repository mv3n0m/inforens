import express from 'express'
import { UserController } from '../controllers'
import { setUserStageValidationRules } from '../schemas/user'
import validator from '../middlewares/validator'

const router = express.Router()

router.get('/', UserController.getUsers)

router.patch(
  '/set-stage',
  setUserStageValidationRules,
  validator,
  UserController.setUserStage,
)
export default router
