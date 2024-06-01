import express from 'express'
import { CommonController } from '../controllers'
import validator from '../middlewares/validator'
import {
  getCoursesValidationRules,
  getLocationsValidationRules,
  getUniversitiesValidationRules,
} from '../schemas/common'

const router = express.Router()

router.get('/countries', CommonController.fetchCountries)

router.get(
  '/locations',
  getLocationsValidationRules,
  validator,
  CommonController.fetchLocations,
)

router.get(
  '/universities',
  getUniversitiesValidationRules,
  validator,
  CommonController.fetchUniversities,
)

router.get('/levels', CommonController.fetchLevels)

router.get(
  '/courses',
  getCoursesValidationRules,
  validator,
  CommonController.fetchCourses,
)

export default router
