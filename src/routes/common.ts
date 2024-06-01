import express from 'express'
import { CommonController } from '../controllers'
import validator from '../middlewares/validator'
import {
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

export default router
