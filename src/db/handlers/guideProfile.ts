import { Types } from '../../config'
import GuideProfile from '../models/guideProfile'
import sqlize from '../sqlize'

export default class {
  static async getGuideProfiles(
    criteria?: any,
    options?: { attributes?: string[] },
  ) {
    return GuideProfile.findAndCountAll({
      where: criteria,
      raw: true,
      ...options,
    })
  }

  static async getGuideProfile(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return GuideProfile.findOne({ where: criteria, raw: true, ...options })
  }

  static async getGuideProfileById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return GuideProfile.findByPk(id, { raw: true, ...options })
  }

  static async getGuideProfileByUserId(
    userId: string,
    options?: {
      attributes?: string[]
    },
  ) {
    const [results] = await sqlize.query(
      `
        SELECT
          g."universityEmail",
          g."introVidUrl",
          g."aboutMe",
          g."courseName",
          g."yearOfCompletion",
          jsonb_build_object('code', c.code, 'name', c.name) AS country,
          jsonb_build_object('id', u.id, 'name', u.name) AS university,
          jsonb_build_object('id', le.id, 'name', le.name) AS level,
          jsonb_build_object('id', d.id, 'name', d.name) AS discipline,
          json_agg(DISTINCT jsonb_strip_nulls(jsonb_build_object('id', s.id, 'name', s.name))) AS skills,
          json_agg(DISTINCT jsonb_strip_nulls(jsonb_build_object('id', l.id, 'name', l.name))) AS languages,
          json_agg(DISTINCT jsonb_strip_nulls(jsonb_build_object('id', i.id, 'name', i.name))) AS interests
        FROM
          "guideProfiles" g
        LEFT JOIN
          "countries" c ON g."countryCode" = c.code
        LEFT JOIN
          "universities" u ON g."universityId" = u.id
        LEFT JOIN
          "levels" le ON g."levelId" = le.id
        LEFT JOIN
          "disciplines" d ON g."disciplineId" = d.id
        LEFT JOIN
          "skills" s ON s.id = ANY(g."skillIds")
        LEFT JOIN
          "languages" l ON l.id = ANY(g."languageIds")
        LEFT JOIN
          "interests" i ON i.id = ANY(g."interestIds")
        WHERE
          g."userId" = :userId
        GROUP BY
          g."userId", c.code, u.id, le.id, d.id;
      `,
      {
        replacements: { userId },
      },
    )
    return results[0]
  }

  static async getGuideProfilesByIds(
    ids: number[],
    options?: {
      attributes?: string[]
    },
  ) {
    return GuideProfile.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async createGuideProfile(data: Types.GuideProfile) {
    return GuideProfile.create(data)
  }

  static async updateGuideProfile(
    userId: string,
    data: Partial<Types.GuideProfileQuery>,
  ) {
    return GuideProfile.update(data, {
      where: { userId },
    })
  }
}
