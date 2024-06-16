import UserPreferences from '../models/userPreferences'
import { Types } from '../../config'
import sqlize from '../sqlize'

export default class {
  static async getUserPreferences(
    criteria?: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return UserPreferences.findOne({ where: criteria, raw: true, ...options })
  }

  static async getUserPreferencesByUserId(
    userId: string,
    options?: {
      attributes?: string[]
    },
  ) {
    const [results] = await sqlize.query(
      `
      SELECT
        jsonb_build_object('code', c.code, 'name', c.name) AS country,
        json_agg(DISTINCT jsonb_strip_nulls(jsonb_build_object('id', r.id, 'name', r.name))) AS regions,
        json_agg(DISTINCT jsonb_strip_nulls(jsonb_build_object('id', l.id, 'name', l.name))) AS levels,
        json_agg(DISTINCT jsonb_strip_nulls(jsonb_build_object('id', cs.id, 'name', cs.name))) AS courses,
        json_agg(DISTINCT jsonb_strip_nulls(jsonb_build_object('id', uni.id, 'name', uni.name))) AS universities
      FROM
        "userPreferences" u
      LEFT JOIN
        "countries" c ON u."countryCode" = c.code
      LEFT JOIN
        "regions" r ON r.id = ANY(u."regionIds")
      LEFT JOIN
        "levels" l ON l.id = ANY(u."levelIds")
      LEFT JOIN
        "courses" cs ON cs.id = ANY(u."courseIds")
      LEFT JOIN
        "universities" uni ON uni.id = ANY(u."universityIds")
      WHERE
        u."userId" = :userId
      GROUP BY
        u."userId", c.code;
    `,
      {
        replacements: { userId },
      },
    )
    return results[0]
  }

  static async createUserPreferences(data: Types.UserPreferences) {
    return UserPreferences.create(data)
  }

  static async updateUserPreferences(
    userId: string,
    data: Partial<Types.UserPreferences>,
  ) {
    return UserPreferences.update(data, {
      where: { userId },
    })
  }
}
