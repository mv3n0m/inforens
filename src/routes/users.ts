import express from 'express'
import { UserController } from '../controllers'
import {
  userPreferencesValidationRules,
  setUserStageValidationRules,
  userProfileValidationRules,
  userAddressValidationRules,
  setUserRoleValidationRules,
  userFileValidationRules,
  userEducationValidationRules,
  userExperienceValidationRules,
} from '../schemas/users'
import validator from '../middlewares/validator'
import multer from 'multer'
import { param } from 'express-validator'

const uploader = multer({ storage: multer.memoryStorage() })
const router = express.Router()

router.get('/', UserController.getUsers)

/**
 * @swagger
 * /users/basic-info:
 *   get:
 *     summary: Get user's basic info
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {firstName: string, lastName: string, email: string, mobileNumber: string, profileImgUrl: string, emailVerified: false}
 */
router.get('/basic-info', UserController.getUserBasicInfo)

/**
 * @swagger
 * /users/role:
 *   post:
 *     summary: Set user's role
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
 * /users/files:
 *   put:
 *     summary: Upload user files
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *               tag:
 *                 type: string
 *                 enum:
 *                   - Identity
 *                   - Resume
 *                   - ProfileImg
 *                 description: Tag categorizing the file
 *                 example: Identity
 *             required:
 *               - file
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
 *                   example: File uploaded successfully
 */
router.put(
  '/files',
  uploader.single('file'),
  userFileValidationRules,
  validator,
  UserController.updateUserFile,
)

/**
 * @swagger
 * /users/files:
 *   get:
 *     summary: Fetch user files
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get('/files', UserController.getUserFiles)

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
 *               disciplineIds:
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
 *                 disciplines:
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
 *               disciplineIds:
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
 *                 enum:
 *                   - Permanent
 *                   - Current
 *                   - Correspondence
 *                 example: Permanent
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
  userAddressValidationRules,
  validator,
  UserController.addUserAddress,
)

/**
 * @swagger
 * /users/address/{id}:
 *   put:
 *     summary: Update user's address
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
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
 *                 enum:
 *                   - Permanent
 *                   - Current
 *                   - Correspondence
 *                 example: Permanent
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
  '/address/:id',
  [param('id').notEmpty().isInt(), ...userAddressValidationRules],
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

/**
 * @swagger
 * /users/education:
 *   post:
 *     summary: Add user's education
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
 *               regionId:
 *                 type: number
 *               location:
 *                 type: string
 *               levelId:
 *                 type: number
 *               universityId:
 *                 type: number
 *               institutionName:
 *                 type: string
 *               disciplineId:
 *                 type: number
 *               courseName:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               result:
 *                 type: string
 *             required:
 *               - countryCode
 *               - regionId
 *               - levelId
 *               - universityId
 *               - disciplineId
 *               - startDate
 *               - endDate
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
  '/education',
  userEducationValidationRules,
  validator,
  UserController.addUserEducation,
)

/**
 * @swagger
 * /users/education/{id}:
 *   put:
 *     summary: Update user's education
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
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
 *               regionId:
 *                 type: number
 *               location:
 *                 type: string
 *               levelId:
 *                 type: number
 *               universityId:
 *                 type: number
 *               institutionName:
 *                 type: string
 *               disciplineId:
 *                 type: number
 *               courseName:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               result:
 *                 type: string
 *             required:
 *               - countryCode
 *               - regionId
 *               - levelId
 *               - universityId
 *               - disciplineId
 *               - startDate
 *               - endDate
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
  '/education/:id',
  [param('id').notEmpty().isInt(), ...userEducationValidationRules],
  validator,
  UserController.updateUserEducation,
)

/**
 * @swagger
 * /users/educations:
 *   get:
 *     summary: Get user's educations
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get('/educations', UserController.getUserEducations)

/**
 * @swagger
 * /users/experience:
 *   post:
 *     summary: Add user's experience
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
 *               title:
 *                 type: string
 *               institutionName:
 *                 type: number
 *               institutionAddress:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               tag:
 *                 type: string
 *                 enum:
 *                   - Internship
 *                   - FullTime
 *                   - PartTime
 *                   - Contract
 *                   - Freelance
 *                 example: FullTime
 *             required:
 *               - title
 *               - institutionName
 *               - startDate
 *               - endDate
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
  '/experience',
  userExperienceValidationRules,
  validator,
  UserController.addUserExperience,
)

/**
 * @swagger
 * /users/experience/{id}:
 *   put:
 *     summary: Update user's experience
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               institutionName:
 *                 type: number
 *               institutionAddress:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               tag:
 *                 type: string
 *                 enum:
 *                   - Internship
 *                   - FullTime
 *                   - PartTime
 *                   - Contract
 *                   - Freelance
 *                 example: FullTime
 *             required:
 *               - title
 *               - institutionName
 *               - startDate
 *               - endDate
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
  '/experience/:id',
  [param('id').notEmpty().isInt(), ...userExperienceValidationRules],
  validator,
  UserController.updateUserExperience,
)

/**
 * @swagger
 * /users/experiences:
 *   get:
 *     summary: Get user's experiences
 *     tags:
 *       - Users
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get('/experiences', UserController.getUserExperiences)

export default router
