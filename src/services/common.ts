import { Types } from '../config'
import {
  CountryDbHandler,
  CourseDbHandler,
  LevelDbHandler,
  RegionDbHandler,
  UniversityDbHandler,
} from '../db/handlers'

export default class {
  static async fetchCountries() {
    const countries = await CountryDbHandler.getCountries({ isActive: true })
    return countries
  }

  static async fetchRegions(countryCode: string) {
    const countries = await RegionDbHandler.getRegionsByCountryCode(
      countryCode,
      { isActive: true },
      {
        attributes: ['id', 'name'],
      },
    )
    return countries
  }

  static async fetchUniversities(params: {
    regionIds?: number[]
    countryCode?: string
  }) {
    const { regionIds, countryCode } = params

    let universities
    if (countryCode) {
      universities = await UniversityDbHandler.getUniversitiesByCountryId(
        countryCode,
        {
          isActive: true,
        },
      )
    } else if (regionIds) {
      universities = await UniversityDbHandler.getUniversitiesByRegionIds(
        regionIds,
        { isActive: true },
      )
    } else {
      universities = await UniversityDbHandler.getUniversities({
        isActive: true,
      })
    }

    return universities
  }

  static async fetchLevels() {
    const levels = await LevelDbHandler.getLevels({ isActive: true })
    return levels
  }

  static async fetchCourses(params: Partial<Types.Course>) {
    const levels = await CourseDbHandler.getCourses({
      isActive: true,
      ...params,
    })
    return levels
  }
}
