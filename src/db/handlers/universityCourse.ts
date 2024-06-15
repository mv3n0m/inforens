import { Types } from '../../config'
import UniversityCourse from '../models/course'

export default class {
  static async getAllUniversityCourses(
    criteria?: any,
    options?: { attributes?: string[] },
  ) {
    return UniversityCourse.findAndCountAll({
      where: criteria,
      raw: true,
      ...options,
    })
  }

  static async getUniversityCourse(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return UniversityCourse.findOne({ where: criteria, raw: true, ...options })
  }

  static async getUniversityCourseById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return UniversityCourse.findByPk(id, { raw: true, ...options })
  }

  static async getUniversityCoursesByIds(
    ids: number[],
    options?: {
      attributes?: string[]
    },
  ) {
    return UniversityCourse.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async createUniversityCourse(data: Types.UniversityCourse) {
    return UniversityCourse.create(data)
  }

  static async updateUniversityCourse(
    code: number,
    data: Partial<Types.UniversityCourse>,
  ) {
    return UniversityCourse.update(data, {
      where: { code },
    })
  }
}
