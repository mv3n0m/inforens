import express from 'express'
import { AccountController, UserController } from '../controllers'
import {
  signInValidationRules,
  signUpValidationRules,
  mobileNumberValidationRule,
  setUserRoleValidationRules,
  verifyOtpValidationRules,
  resetPasswordValidationRules,
  confirmUpdateRequestValidationRules,
  changePasswordValidationRules,
} from '../schemas/accounts'
import validator from '../middlewares/validator'

const router = express.Router()

router.post(
  '/request-mobile-otp',
  mobileNumberValidationRule,
  validator,
  AccountController.requestMobileOtp,
)

router.post(
  '/verify-otp',
  verifyOtpValidationRules,
  validator,
  AccountController.verifyOtp,
)

router.post(
  '/sign-up',
  signUpValidationRules,
  validator,
  AccountController.signUp,
)

router.post(
  '/sign-in',
  signInValidationRules,
  validator,
  AccountController.signIn,
)

router.post(
  '/reset-password',
  resetPasswordValidationRules,
  validator,
  AccountController.resetPassword,
)

router.post(
  '/confirm-reset-request',
  confirmUpdateRequestValidationRules,
  validator,
  AccountController.confirmResetRequest,
)

router.patch(
  '/change-password',
  changePasswordValidationRules,
  validator,
  AccountController.changePassword,
)

router.post(
  '/set-user-role',
  setUserRoleValidationRules,
  validator,
  UserController.setUserRole,
)

export default router
