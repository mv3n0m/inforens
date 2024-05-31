import express from 'express'
import { CommonController } from '../controllers'
import validator from '../middlewares/validator'
import { getLocationsValidationRules } from '../schemas/common'

const router = express.Router()

router.get('/countries', CommonController.fetchCountries)

router.get(
  '/locations',
  getLocationsValidationRules,
  validator,
  CommonController.fetchLocations,
)

export default router
