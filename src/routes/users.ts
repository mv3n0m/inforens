import express from 'express'
import { UserController } from '../controllers'
import {
  setUserPreferencesValidationRules,
  setUserStageValidationRules,
} from '../schemas/user'
import validator from '../middlewares/validator'

const router = express.Router()

router.get('/', UserController.getUsers)

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
 *               locationIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *               levelId:
 *                 type: integer
 *                 example: 1
 *               courseId:
 *                 type: integer
 *                 example: 2
 *               universityId:
 *                 type: integer
 *                 example: 3
 *               isActive:
 *                 type: boolean
 *                 description: Optional - true by default
 *             required:
 *               - countryCode
 *               - locationIds
 *               - levelId
 *               - courseId
 *               - universityId
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
  setUserPreferencesValidationRules,
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
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 countryCode:
 *                   type: string
 *                   example: USA
 *                 locationIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [1, 2, 3]
 *                 levelId:
 *                   type: integer
 *                   example: 1
 *                 courseId:
 *                   type: integer
 *                   example: 2
 *                 universityId:
 *                   type: integer
 *                   example: 3
 */
router.get('/preferences', UserController.getUserPreferences)

export default router
