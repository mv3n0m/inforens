import { Types } from '../../config'
import Country from '../models/country'

export default class {
  static async getCountries(
    criteria?: any,
    options?: { attributes?: string[] },
  ) {
    return Country.findAndCountAll({
      where: criteria,
      raw: true,
      ...options,
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

  static async getCountryByCode(
    code: string,
    options?: {
      attributes?: string[]
    },
  ) {
    return Country.findByPk(code, { raw: true, ...options })
  }

  static async getCountriesByCodes(
    codes: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Country.findAndCountAll({
      where: { code: codes },
      raw: true,
      ...options,
    })
  }

  static async createCountry(data: Types.Country) {
    return Country.create(data)
  }

  static async updateCountry(code: number, data: Partial<Types.Country>) {
    return Country.update(data, {
      where: { code },
    })
  }
}
