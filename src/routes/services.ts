import express from 'express'
import validator from '../middlewares/validator'
import { getRecommendationsValidationRules } from '../schemas/services'
import { ServicesController } from '../controllers'
import { userPreferencesValidationRules } from '../schemas/users'
import { getProductsValidationRules } from '../schemas/common'

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
 *             - Products
 *         default: guides
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
 * /services/search/guides:
 *   post:
 *     summary: Fetch guide results based on input parameters.
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
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.post(
  '/search/guides',
  userPreferencesValidationRules,
  validator,
  ServicesController.getRecommendations,
)

/**
 * @swagger
 * /services/products:
 *   get:
 *     summary: Fetch products results based on input stage.
 *     description: __Note__ - This input stage will have higher priority than the stored stage value of the user.
 *     tags:
 *       - Services
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *       - in: query
 *         name: stage
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - PreApplication
 *             - AlreadyApplied
 *             - GotAdmission
 *             - AlreadyAtUniversity
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get(
  '/products',
  getProductsValidationRules,
  validator,
  ServicesController.getProducts,
)

export default router
