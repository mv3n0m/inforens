import express from 'express'
import { UserController } from '../controllers'
import {
  userPreferencesValidationRules,
  setUserStageValidationRules,
  userProfileValidationRules,
  userAddressValdiationRules,
  setUserRoleValidationRules,
} from '../schemas/user'
import validator from '../middlewares/validator'

const router = express.Router()

router.get('/', UserController.getUsers)

/**
 * @swagger
 * /users/role:
 *   post:
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
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
 *             required:
 *               - userRole
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
  '/role',
  setUserRoleValidationRules,
  validator,
  UserController.setUserRole,
)

/**
 * @swagger
 * /users/stage:
 *   patch:
 *     summary: Set user's current stage
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stage:
 *                 type: string
 *                 enum:
 *                   - PreApplication
 *                   - AlreadyApplied
 *                   - GotAdmission
 *                   - AlreadyAtUniversity
 *             required:
 *               - stage
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
 */
router.patch(
  '/stage',
  setUserStageValidationRules,
  validator,
  UserController.setUserStage,
)

/**
 * @swagger
 * /users/preferences:
 *   post:
 *     summary: Set user's preferences
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               countryCode:
 *                 type: string
 *                 description: must be 'ISO 3166-1 alpha-3' code
 *                 example: USA
 *               regionIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *               levelIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1]
 *               courseIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [2]
 *               universityIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: []
 *               isActive:
 *                 type: boolean
 *                 description: Optional - true by default
 *             required:
 *               - countryCode
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
 */
router.post(
  '/preferences',
  userPreferencesValidationRules,
  validator,
  UserController.setUserPreferences,
)

/**
 * @swagger
 * /users/preferences:
 *   get:
 *     summary: Get user's preferences
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 country:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: USA
 *                     name:
 *                       type: string
 *                       example: United States of America
 *                 regions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Nevada
 *                 levels:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Bachelors
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                 universities:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/preferences', UserController.getUserPreferences)

/**
 * @swagger
 * /users/preferences:
 *   put:
 *     summary: Update user's preferences
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               countryCode:
 *                 type: string
 *                 description: must be 'ISO 3166-1 alpha-3' code
 *                 example: USA
 *               regionIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *               levelIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1]
 *               courseIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [2]
 *               universityIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: []
 *               isActive:
 *                 type: boolean
 *                 description: Optional - true by default
 *             required:
 *               - countryCode
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
 */
router.put(
  '/preferences',
  userPreferencesValidationRules,
  validator,
  UserController.updateUserPreferences,
)

/**
 * @swagger
 * /users/profile:
 *   patch:
 *     summary: Update user's profile details
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gender:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 description: any date format
 *               countryOfBirth:
 *                 type: string
 *                 description: full country name
 *               nationality:
 *                 type: string
 *               nativeLanguage:
 *                 type: string
 *               bio:
 *                 type: string
 *               otherContacts:
 *                 type: array
 *                 items:
 *                   type: object
 *               emergencyContactDetails:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   mobileNumber:
 *                     type: string
 *                   email:
 *                     type: string
 *                   relation:
 *                     type: string
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
 */
router.patch(
  '/profile',
  userProfileValidationRules,
  validator,
  UserController.updateUserProfile,
)

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user's profile details
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/profile', UserController.getUserProfile)

/**
 * @swagger
 * /users/address:
 *   post:
 *     summary: Add user's address
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address1:
 *                 type: string
 *               address2:
 *                 type: string
 *               countryCode:
 *                 type: string
 *                 description: must be 'ISO 3166-1 alpha-3' code
 *                 example: USA
 *               state:
 *                 type: string
 *               postCode:
 *                 type: string
 *               city:
 *                 type: string
 *               tag:
 *                 type: string
 *             required:
 *               - address1
 *               - countryCode
 *               - state
 *               - postCode
 *               - city
 *               - tag
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
 */
router.post(
  '/address',
  userAddressValdiationRules,
  validator,
  UserController.addUserAddress,
)

/**
 * @swagger
 * /users/address:
 *   put:
 *     summary: Update user's address
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address1:
 *                 type: string
 *               address2:
 *                 type: string
 *               countryCode:
 *                 type: string
 *                 description: must be 'ISO 3166-1 alpha-3' code
 *                 example: USA
 *               state:
 *                 type: string
 *               postCode:
 *                 type: string
 *               city:
 *                 type: string
 *               tag:
 *                 type: string
 *             required:
 *               - address1
 *               - countryCode
 *               - state
 *               - postCode
 *               - city
 *               - tag
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
 */
router.put(
  '/address',
  userAddressValdiationRules,
  validator,
  UserController.updateUserAddress,
)

/**
 * @swagger
 * /users/addresses:
 *   get:
 *     summary: Get user's addresses
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get('/addresses', UserController.getUserAddresses)

export default router
