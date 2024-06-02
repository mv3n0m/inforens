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

  static async getUniversitiesByLocationId(
    locationId: number,
    criteria?: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return University.findAndCountAll({
      where: { locationId, ...criteria },
      raw: true,
      ...options,
    })
  }

  static async getUniversitiesByLocationIds(
    locationIds: number[],
    criteria?: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return University.findAndCountAll({
      where: { locationId: locationIds, ...criteria },
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
