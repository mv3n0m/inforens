import express from 'express'
import { AccountController, UserController } from '../controllers'
import {
  signInValidationRules,
  signUpValidationRules,
  mobileNumberValidationRule,
  setUserRoleValidationRules,
  verifyOtpValidationRules,
  resetPasswordValidationRules,
  changePasswordValidationRules,
} from '../schemas/accounts'
import validator from '../middlewares/validator'

const router = express.Router()

/**
 * @swagger
 * /accounts/request-mobile-otp:
 *   post:
 *     summary: Request mobile verification
 *     tags:
 *       - Accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 description: 'Format: +|countryCode| |space| |mobileNumber|'
 *             required:
 *               - mobileNumber
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OTP sent to user's WhatsApp
 *                 token:
 *                   type: string
 *                   format: uuid
 *                   example: 882d66ce-33da-424b-b6db-38ea4ab3e152
 *                 totp:
 *                   type: string
 *                   example: '546920 - (Temporarily provided for testing purposes)'
 */
router.post(
  '/request-mobile-otp',
  mobileNumberValidationRule,
  validator,
  AccountController.requestMobileOtp,
)

/**
 * @swagger
 * /accounts/verify-otp:
 *   post:
 *     summary: "Verify OTPs generated from requests => 'request-mobile-otp' || 'sign-up'"
 *     tags:
 *       - Accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *               token:
 *                 type: string
 *             required:
 *               - otp
 *               - token
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Mobile number verified successfully.
 */
router.post(
  '/verify-otp',
  verifyOtpValidationRules,
  validator,
  AccountController.verifyOtp,
)

/**
 * @swagger
 * /accounts/sign-up:
 *   post:
 *     tags:
 *       - Accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *                 description: 'Format: +|countryCode| |space| |mobileNumber|'
 *             required:
 *               - firstName
 *               - lastName
 *               - password
 *               - email
 *               - mobileNumber
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OTP sent to user's WhatsApp
 *                 token:
 *                   type: string
 *                   format: uuid
 *                   example: 882d66ce-33da-424b-b6db-38ea4ab3e152
 *                 totp:
 *                   type: string
 *                   example: '546920 - (Temporarily provided for testing purposes)'
 */
router.post(
  '/sign-up',
  signUpValidationRules,
  validator,
  AccountController.signUp,
)

/**
 * @swagger
 * /accounts/sign-in:
 *   post:
 *     tags:
 *       - Accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *                 description: 'Format: +|countryCode| |space| |mobileNumber|'
 *               origin:
 *                 type: string
 *                 description: Any text as an identifier for origin
 *             required:
 *               - origin
 *               - password
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Successful sign-in
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsI...
 *       400:
 *         description: email or mobileNumber not provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Either email or mobileNumber required.
 */
router.post(
  '/sign-in',
  signInValidationRules,
  validator,
  AccountController.signIn,
)

/**
 * @swagger
 * /accounts/reset-password:
 *   post:
 *     summary: Request password reset
 *     tags:
 *       - Accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: OTP sent to user's WhatsApp
 *                 token:
 *                   type: string
 *                   format: uuid
 *                   example: 882d66ce-33da-424b-b6db-38ea4ab3e152
 *                 totp:
 *                   type: string
 *                   example: '546920 - (Temporarily provided for testing purposes)'
 */
router.post(
  '/reset-password',
  resetPasswordValidationRules,
  validator,
  AccountController.resetPassword,
)

/**
 * @swagger
 * /accounts/confirm-reset-request:
 *   post:
 *     summary: Verify password reset request
 *     tags:
 *       - Accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *               token:
 *                 type: string
 *             required:
 *               - otp
 *               - token
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Password reset request confirmed.
 */
router.post(
  '/confirm-reset-request',
  verifyOtpValidationRules,
  validator,
  AccountController.confirmResetRequest,
)

/**
 * @swagger
 * /accounts/change-password:
 *   post:
 *     tags:
 *       - Accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: new password to update
 *               token:
 *                 type: string
 *                 description: token received from 'reset-password' request
 *             required:
 *               - password
 *               - token
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: User password updated successfully
 */
router.patch(
  '/change-password',
  changePasswordValidationRules,
  validator,
  AccountController.changePassword,
)

/**
 * @swagger
 * /accounts/set-user-role:
 *   patch:
 *     tags:
 *       - Accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userRole:
 *                 type: string
 *                 enum:
 *                   - Student
 *                   - Guide
 *                   - Staff
 *                   - Admin
 *               token:
 *                 type: string
 *                 description: token received from 'sign-up' request
 *             required:
 *               - userRole
 *               - token
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: User role set successfully
 */
router.post(
  '/set-user-role',
  setUserRoleValidationRules,
  validator,
  UserController.setUserRole,
)

export default router
