import { Types } from '../../config'
import Interest from '../models/interest'

export default class {
  static async getInterests(criteria?: any) {
    return Interest.findAndCountAll({
      where: criteria,
      raw: true,
    })
  }

  static async getInterest(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Interest.findOne({ where: criteria, raw: true, ...options })
  }

  static async getInterestById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Interest.findByPk(id, { raw: true, ...options })
  }

  static async getInterestsByIds(
    ids: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Interest.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async createInterest(data: Types.Interest) {
    return Interest.create(data)
  }

  static async updateInterest(id: number, data: Partial<Types.Interest>) {
    return Interest.update(data, {
      where: { id },
    })
  }
}
