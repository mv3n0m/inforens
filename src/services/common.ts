import { Types } from '../config'
import { USER_STAGE } from '../config/enums'
import {
  CountryDbHandler,
  DisciplineDbHandler,
  InterestDbHandler,
  LanguageDbHandler,
  LevelDbHandler,
  ProductDbHandler,
  RegionDbHandler,
  SkillDbHandler,
  TaskDbHandler,
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

  static async fetchSkills() {
    const skills = await SkillDbHandler.getSkills({ isActive: true })
    return skills
  }

  static async fetchLanguages() {
    const languages = await LanguageDbHandler.getLanguages({ isActive: true })
    return languages
  }

  static async fetchInterests() {
    const interests = await InterestDbHandler.getInterests({ isActive: true })
    return interests
  }

  static async fetchDisciplines() {
    const levels = await DisciplineDbHandler.getDisciplines({ isActive: true })
    return levels
  }

  static async fetchProducts(criteria: { stage?: USER_STAGE }) {
    const products = await ProductDbHandler.getProducts(criteria)
    return products
  }
  static async fetchTasks(criteria: any) {
    const products = await TaskDbHandler.getTasks(criteria)
    return products
  }
}
