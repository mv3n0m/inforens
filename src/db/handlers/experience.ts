import { Types } from '../../config'
import Experience from '../models/experience'

export default class {
  static async getExperiences(
    criteria?: any,
    options?: { attributes?: string[] },
  ) {
    return Experience.findAndCountAll({
      where: criteria,
      raw: true,
      ...options,
    })
  }

  static async getExperience(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Experience.findOne({ where: criteria, raw: true, ...options })
  }

  static async getExperienceById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Experience.findByPk(id, { raw: true, ...options })
  }

  static async getExperiencesByIds(
    ids: number[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Experience.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async getExperiencesByUserId(
    userId: string,
    options?: {
      attributes?: string[]
    },
  ) {
    return Experience.findAndCountAll({
      where: { userId },
      raw: true,
      ...options,
    })
  }

  static async createExperience(data: Types.Experience) {
    return Experience.create(data)
  }

  static async updateExperience(
    id: number,
    userId: string,
    data: Partial<Types.Experience>,
  ) {
    return Experience.update(data, {
      where: { id, userId },
    })
  }
}
