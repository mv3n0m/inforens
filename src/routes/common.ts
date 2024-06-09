import express from 'express'
import { CommonController } from '../controllers'
import validator from '../middlewares/validator'
import {
  getCoursesValidationRules,
  getLocationsValidationRules,
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
 * /common/locations:
 *   get:
 *     summary: Retrieve a list of locations
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
  '/locations',
  getLocationsValidationRules,
  validator,
  CommonController.fetchLocations,
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
 *         name: locationIds
 *         required: true
 *         description: Comma-separated list of location IDs
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
 *       - in: query
 *         name: levelId
 *         required: false
 *         description: Id of the level to search courses for
 *         schema:
 *           type: interger
 *           example: 1
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
