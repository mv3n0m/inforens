import { Types } from '../../config'
import Language from '../models/language'

export default class {
  static async getLanguages(criteria?: any) {
    return Language.findAndCountAll({
      where: criteria,
      raw: true,
    })
  }

  static async getLanguage(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Language.findOne({ where: criteria, raw: true, ...options })
  }

  static async getLanguageById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Language.findByPk(id, { raw: true, ...options })
  }

  static async getLanguagesByIds(
    ids: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Language.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async createLanguage(data: Types.Language) {
    return Language.create(data)
  }

  static async updateLanguage(id: number, data: Partial<Types.Language>) {
    return Language.update(data, {
      where: { id },
    })
  }
}
