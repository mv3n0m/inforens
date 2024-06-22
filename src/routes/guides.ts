import express from 'express'
import { GuideController } from '../controllers'

import validator from '../middlewares/validator'
import {
  guideProfileCreateValidationRules,
  guideProfileUpdateValidationRules,
} from '../schemas/guides'

const router = express.Router()

/**
 * @swagger
 * /guides/profile:
 *   get:
 *     summary: Retrieve a guide's profile
 *     tags:
 *       - Guides
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/profile', GuideController.getGuideProfile)

/**
 * @swagger
 * /guides/profile:
 *   post:
 *     summary: Create Guide Profile | Use for onboarding guides
 *     tags:
 *       - Guides
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               universityEmail:
 *                 type: string
 *                 format: email
 *                 description: Email address associated with the university.
 *                 example: user@univ.edu
 *               countryCode:
 *                 type: string
 *                 description: Country code of the guide.
 *                 example: USA
 *               universityId:
 *                 type: integer
 *                 description: ID of the university.
 *                 example: 1
 *               levelId:
 *                 type: integer
 *                 description: ID of the level.
 *                 example: 1
 *               disciplineId:
 *                 type: integer
 *                 description: ID of the discipline.
 *                 example: 1
 *               courseName:
 *                 type: string
 *                 description: Name of the course. Optional.
 *               yearOfCompletion:
 *                 type: integer
 *                 description: Expected year of completion.
 *                 example: 2020
 *             required:
 *               - universityEmail
 *               - countryCode
 *               - universityId
 *               - levelId
 *               - disciplineId
 *               - yearOfCompletion
 *     responses:
 *       201:
 *         description: Guide profile created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Guide profile created successfully.
 */
router.post(
  '/profile',
  guideProfileCreateValidationRules,
  validator,
  GuideController.createGuideProfile,
)

/**
 * @swagger
 * /guides/profile:
 *   patch:
 *     summary: Update Guide Profile
 *     tags:
 *       - Guides
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               introVidUrl:
 *                 type: string
 *                 description: URL of the introduction video.
 *               aboutMe:
 *                 type: string
 *                 description: Information about the guide.
 *               skillIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1]
 *               languageIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *               interestIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: []
 *     responses:
 *       200:
 *         description: Guide profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Guide profile updated successfully.
 */
router.patch(
  '/profile',
  guideProfileUpdateValidationRules,
  validator,
  GuideController.updateGuideProfile,
)

export default router
