import { Types } from '../../config'
import University from '../models/university'

export default class {
  static async getUniversities(criteria?: any) {
    return University.findAndCountAll({
      where: criteria,
      raw: true,
    })
  }

  static async getUniversity(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return University.findOne({ where: criteria, raw: true, ...options })
  }

  static async getUniversityById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return University.findByPk(id, { raw: true, ...options })
  }

  static async getUniversitiesByRegionId(
    regionId: number,
    criteria?: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return University.findAndCountAll({
      where: { regionId, ...criteria },
      raw: true,
      ...options,
    })
  }

  static async getUniversitiesByRegionIds(
    regionIds: number[],
    criteria?: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return University.findAndCountAll({
      where: { regionId: regionIds, ...criteria },
      raw: true,
      ...options,
    })
  }

  static async getUniversitiesByIds(
    ids: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return University.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async createUniversity(data: Types.University) {
    return University.create(data)
  }

  static async updateUniversity(id: number, data: Partial<Types.University>) {
    return University.update(data, {
      where: { id },
    })
  }
}
