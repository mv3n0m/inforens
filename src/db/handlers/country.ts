import { Types } from '../../config'
import Country from '../models/country'

export default class {
  static async getCountries(criteria?: any) {
    return Country.findAll({
      where: criteria,
      raw: true,
    })
  }

  static async getCountry(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Country.findOne({ where: criteria, raw: true, ...options })
  }

  static async getCountryById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Country.findByPk(id, { raw: true, ...options })
  }

  static async getCountriesByIds(
    ids: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Country.findAll({ where: { id: ids }, raw: true, ...options })
  }

  static async createCountry(data: Types.Country) {
    return Country.create(data)
  }

  static async updateCountry(id: string, data: Partial<Types.Country>) {
    return Country.update(data, {
      where: { id },
    })
  }
}
