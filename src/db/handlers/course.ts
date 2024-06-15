import { Types } from '../../config'
import Course from '../models/course'

export default class {
  static async getCourses(criteria?: any, options?: { attributes?: string[] }) {
    return Course.findAndCountAll({
      where: criteria,
      raw: true,
      ...options,
    })
  }

  static async getCourse(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Course.findOne({ where: criteria, raw: true, ...options })
  }

  static async getCourseById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Course.findByPk(id, { raw: true, ...options })
  }

  static async getCoursesByIds(
    ids: number[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Course.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async createCourse(data: Types.Course) {
    return Course.create(data)
  }

  static async updateCourse(code: number, data: Partial<Types.Course>) {
    return Course.update(data, {
      where: { code },
    })
  }
}
