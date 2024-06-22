import express from 'express'
import { CommonController } from '../controllers'
import validator from '../middlewares/validator'
import {
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
 *     description: __Note__ - `countryCode` will have higher priority than `regionIds`
 *     tags:
 *       - Common
 *     parameters:
 *       - in: query
 *         name: countryCode
 *         required: false
 *         description: must be 'ISO 3166-1 alpha-3' code
 *         schema:
 *           type: string
 *           example: "USA"
 *       - in: query
 *         name: regionIds
 *         required: false
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
 * /common/disciplines:
 *   get:
 *     summary: Retrieve a list of disciplines
 *     tags:
 *       - Common
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get('/disciplines', CommonController.fetchDisciplines)

/**
 * @swagger
 * /common/skills:
 *   get:
 *     summary: Retrieve a list of skills
 *     tags:
 *       - Common
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get('/skills', CommonController.fetchSkills)

/**
 * @swagger
 * /common/languages:
 *   get:
 *     summary: Retrieve a list of languages
 *     tags:
 *       - Common
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get('/languages', CommonController.fetchLanguages)

/**
 * @swagger
 * /common/interests:
 *   get:
 *     summary: Retrieve a list of interests
 *     tags:
 *       - Common
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get('/interests', CommonController.fetchInterests)

export default router
