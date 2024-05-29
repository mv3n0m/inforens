import { Types } from '../../config'
import Location from '../models/country'

export default class {
  static async getLocations(criteria?: any) {
    return Location.findAll({
      where: criteria,
      raw: true,
    })
  }

  static async getLocation(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Location.findOne({ where: criteria, raw: true, ...options })
  }

  static async getLocationById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Location.findByPk(id, { raw: true, ...options })
  }

  static async getLocationsByCountryCode(
    code: string,
    options?: {
      attributes?: string[]
    },
  ) {
    return Location.findAll({ where: { code }, raw: true, ...options })
  }

  static async getLocationsByIds(
    ids: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Location.findAll({ where: { id: ids }, raw: true, ...options })
  }

  static async createLocation(data: Types.Location) {
    return Location.create(data)
  }

  static async updateLocation(id: string, data: Partial<Types.Location>) {
    return Location.update(data, {
      where: { id },
    })
  }
}
