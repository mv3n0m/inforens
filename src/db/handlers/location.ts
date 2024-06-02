import { Types } from '../../config'
import Location from '../models/location'

export default class {
  static async getLocations(criteria?: any) {
    return Location.findAndCountAll({
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
    countryCode: string,
    criteria?: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Location.findAndCountAll({
      where: { countryCode, ...criteria },
      raw: true,
      ...options,
    })
  }

  static async getLocationsByIds(
    ids: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Location.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async createLocation(data: Types.Location) {
    return Location.create(data)
  }

  static async updateLocation(id: number, data: Partial<Types.Location>) {
    return Location.update(data, {
      where: { id },
    })
  }
}
