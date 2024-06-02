import express from 'express'
import { UserController } from '../controllers'
import { setUserStageValidationRules } from '../schemas/user'
import validator from '../middlewares/validator'

const router = express.Router()

router.get('/', UserController.getUsers)

/**
 * @swagger
 * /users/set-stage:
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
  '/set-stage',
  setUserStageValidationRules,
  validator,
  UserController.setUserStage,
)

export default router
