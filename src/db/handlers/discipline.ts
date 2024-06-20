import { Types } from '../../config'
import Discipline from '../models/discipline'

export default class {
  static async getDisciplines(
    criteria?: any,
    options?: { attributes?: string[] },
  ) {
    return Discipline.findAndCountAll({
      where: criteria,
      raw: true,
      ...options,
    })
  }

  static async getDiscipline(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Discipline.findOne({ where: criteria, raw: true, ...options })
  }

  static async getDisciplineById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Discipline.findByPk(id, { raw: true, ...options })
  }

  static async getDisciplinesByIds(
    ids: number[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Discipline.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async createDiscipline(data: Types.Discipline) {
    return Discipline.create(data)
  }

  static async updateDiscipline(code: number, data: Partial<Types.Discipline>) {
    return Discipline.update(data, {
      where: { code },
    })
  }
}
