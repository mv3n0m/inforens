import { Types } from '../../config'
import Level from '../models/level'

export default class {
  static async getLevels(criteria?: any) {
    return Level.findAndCountAll({
      where: criteria,
      raw: true,
    })
  }

  static async getLevel(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Level.findOne({ where: criteria, raw: true, ...options })
  }

  static async getLevelById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Level.findByPk(id, { raw: true, ...options })
  }

  static async getLevelsByIds(
    ids: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Level.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async createLevel(data: Types.Level) {
    return Level.create(data)
  }

  static async updateLevel(id: number, data: Partial<Types.Level>) {
    return Level.update(data, {
      where: { id },
    })
  }
}
