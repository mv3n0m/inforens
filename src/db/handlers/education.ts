import { Types } from '../../config'
import Education from '../models/address'

export default class {
  static async getEducations(
    criteria?: any,
    options?: { attributes?: string[] },
  ) {
    return Education.findAndCountAll({
      where: criteria,
      raw: true,
      ...options,
    })
  }

  static async getEducation(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Education.findOne({ where: criteria, raw: true, ...options })
  }

  static async getEducationById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Education.findByPk(id, { raw: true, ...options })
  }

  static async getEducationsByIds(
    ids: number[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Education.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async getEducationsByUserId(
    userId: string,
    options?: {
      attributes?: string[]
    },
  ) {
    return Education.findAndCountAll({
      where: { userId },
      raw: true,
      ...options,
    })
  }

  static async createEducation(data: Types.Education) {
    return Education.create(data)
  }

  static async updateEducation(
    id: number,
    userId: string,
    data: Partial<Types.Education>,
  ) {
    return Education.update(data, {
      where: { id, userId },
    })
  }
}
