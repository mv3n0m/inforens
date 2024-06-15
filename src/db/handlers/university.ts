import { Types } from '../../config'
import University from '../models/university'
import sqlize from '../sqlize'

export default class {
  static async getUniversities(criteria?: any) {
    return University.findAndCountAll({
      where: criteria,
      raw: true,
    })
  }

  static async getUniversity(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return University.findOne({ where: criteria, raw: true, ...options })
  }

  static async getUniversityById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return University.findByPk(id, { raw: true, ...options })
  }

  static async getUniversitiesByRegionId(
    regionId: number,
    criteria?: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return University.findAndCountAll({
      where: { regionId, ...criteria },
      raw: true,
      ...options,
    })
  }

  static async getUniversitiesByRegionIds(
    regionIds: number[],
    criteria?: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return University.findAndCountAll({
      where: { regionId: regionIds, ...criteria },
      raw: true,
      ...options,
    })
  }

  static async getUniversitiesByCountryId(
    countryCode: string,
    criteria?: any,
    options?: {
      attributes?: string[]
    },
  ) {
    const [results] = await sqlize.query(
      `
      SELECT u.id, u."regionId", u.name, u.address, u.phone, u.email
      FROM universities u
      JOIN regions r ON u."regionId" = r.id
      WHERE r."countryCode" = :countryCode;
    `,
      {
        replacements: { countryCode },
      },
    )
    return { count: results.length, rows: results }
  }

  static async getUniversitiesByIds(
    ids: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return University.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async createUniversity(data: Types.University) {
    return University.create(data)
  }

  static async updateUniversity(id: number, data: Partial<Types.University>) {
    return University.update(data, {
      where: { id },
    })
  }
}
