import { Types } from '../../config'
import Region from '../models/region'

export default class {
  static async getRegions(criteria?: any) {
    return Region.findAndCountAll({
      where: criteria,
      raw: true,
    })
  }

  static async getRegion(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Region.findOne({ where: criteria, raw: true, ...options })
  }

  static async getRegionById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Region.findByPk(id, { raw: true, ...options })
  }

  static async getRegionsByCountryCode(
    countryCode: string,
    criteria?: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Region.findAndCountAll({
      where: { countryCode, ...criteria },
      raw: true,
      ...options,
    })
  }

  static async getRegionsByIds(
    ids: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Region.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async createRegion(data: Types.Region) {
    return Region.create(data)
  }

  static async updateRegion(id: number, data: Partial<Types.Region>) {
    return Region.update(data, {
      where: { id },
    })
  }
}
