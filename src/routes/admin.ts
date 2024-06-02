import express from 'express'
import { AdminController } from '../controllers'
import {
  createCountryValidationRules,
  createCourseValidationRules,
  createLevelValidationRules,
  createLocationValidationRules,
  createRoleValidationRules,
  createUniversityValidationRules,
} from '../schemas/admin'
import validator from '../middlewares/validator'

const router = express.Router()

/**
 * @swagger
 * /admin/roles:
 *   get:
 *     summary: Retrieve a list of roles
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 */
router.get('/roles', AdminController.fetchRoles)

/**
 * @swagger
 * /admin/roles:
 *   post:
 *     summary: Create role
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
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
  '/roles',
  createRoleValidationRules,
  validator,
  AdminController.createRole,
)

/**
 * @swagger
 * /admin/countries:
 *   post:
 *     summary: Create a country record
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *                 description: must be 'ISO 3166-1 alpha-3' code
 *               isActive:
 *                 type: boolean
 *                 description: Optional - true by default
 *             required:
 *               - name
 *               - code
 *     responses:
 *       201:
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
  '/countries',
  createCountryValidationRules,
  validator,
  AdminController.createCountry,
)

/**
 * @swagger
 * /admin/locations:
 *   post:
 *     summary: Create a location record
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               countryCode:
 *                 type: string
 *                 description: must be 'ISO 3166-1 alpha-3' code
 *               isActive:
 *                 type: boolean
 *                 description: Optional - true by default
 *             required:
 *               - name
 *               - countryCode
 *     responses:
 *       201:
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
  '/locations',
  createLocationValidationRules,
  validator,
  AdminController.createLocation,
)

/**
 * @swagger
 * /admin/universities:
 *   post:
 *     summary: Create a university record
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               locationId:
 *                 type: integer
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               bio:
 *                 type: string
 *               estd:
 *                 type: string
 *                 description: establishment date
 *               isActive:
 *                 type: boolean
 *                 description: Optional - true by default
 *             required:
 *               - name
 *               - locationId
 *     responses:
 *       201:
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
  '/universities',
  createUniversityValidationRules,
  validator,
  AdminController.createUniversity,
)

/**
 * @swagger
 * /admin/levels:
 *   post:
 *     summary: Create a level record
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *                 description: Optional - true by default
 *             required:
 *               - name
 *     responses:
 *       201:
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
  '/levels',
  createLevelValidationRules,
  validator,
  AdminController.createLevel,
)

/**
 * @swagger
 * /admin/courses:
 *   post:
 *     summary: Create a course record
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *                 description: course code as per university
 *               levelId:
 *                 type: integer
 *               universityId:
 *                 type: integer
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *                 description: Optional - true by default
 *             required:
 *               - name
 *               - code
 *               - levelId
 *               - universityId
 *     responses:
 *       201:
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
  '/courses',
  createCourseValidationRules,
  validator,
  AdminController.createCourse,
)

export default router
