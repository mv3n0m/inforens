import express from 'express'
import validator from '../middlewares/validator'
import { getRecommendationsValidationRules } from '../schemas/services'
import { ServicesController } from '../controllers'

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

export default router
