import express from 'express'
import validator from '../middlewares/validator'
import { getRecommendationsValidationRules } from '../schemas/services'
import { ServicesController } from '../controllers'
import { setUserPreferencesValidationRules } from '../schemas/user'

const router = express.Router()

/**
 * @swagger
 * /services/recommendations:
 *   get:
 *     summary: Get recommendations for users based on key and stored preferences
 *     tags:
 *       - Services
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: query
 *         name: key
 *         required: false
 *         schema:
 *           key: string
 *           enum:
 *             - Guides
 *            # - Courses
 *            # - Products
 *           default: Guides
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get(
  '/recommendations',
  getRecommendationsValidationRules,
  validator,
  ServicesController.getRecommendations,
)

/**
 * @swagger
 * /services/recommendations/guides:
 *   post:
 *     summary: Fetch guide recommendations based on input parameters.
 *     description: __Note__ - These input parameters will have higher priority than the stored preferences of the user.
 *     tags:
 *       - Services
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
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.post(
  '/recommendations/guides',
  setUserPreferencesValidationRules,
  validator,
  ServicesController.getRecommendations,
)

export default router
