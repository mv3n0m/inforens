import express from 'express'
import { CommonController } from '../controllers'
import validator from '../middlewares/validator'
import {
  getCoursesValidationRules,
  getRegionsValidationRules,
  getUniversitiesValidationRules,
} from '../schemas/common'

const router = express.Router()

/**
 * @swagger
 * /common/countries:
 *   get:
 *     summary: Retrieve a list of countries
 *     tags:
 *       - Common
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get('/countries', CommonController.fetchCountries)

/**
 * @swagger
 * /common/regions:
 *   get:
 *     summary: Retrieve a list of regions
 *     tags:
 *       - Common
 *     parameters:
 *       - in: query
 *         name: countryCode
 *         required: true
 *         schema:
 *           type: string
 *           example: "USA"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get(
  '/regions',
  getRegionsValidationRules,
  validator,
  CommonController.fetchRegions,
)

/**
 * @swagger
 * /common/universities:
 *   get:
 *     summary: Retrieve a list of universities
 *     tags:
 *       - Common
 *     parameters:
 *       - in: query
 *         name: regionIds
 *         required: true
 *         description: Comma-separated list of region IDs
 *         schema:
 *           type: string
 *           example: "1,2,3"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get(
  '/universities',
  getUniversitiesValidationRules,
  validator,
  CommonController.fetchUniversities,
)

/**
 * @swagger
 * /common/levels:
 *   get:
 *     summary: Retrieve a list of levels
 *     tags:
 *       - Common
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get('/levels', CommonController.fetchLevels)

/**
 * @swagger
 * /common/courses:
 *   get:
 *     summary: Retrieve a list of courses
 *     tags:
 *       - Common
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Name of the course
 *         schema:
 *           type: string
 *           example: "Computer Science Engineering"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get(
  '/courses',
  getCoursesValidationRules,
  validator,
  CommonController.fetchCourses,
)

export default router
