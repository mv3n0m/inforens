import { Types } from '../../config'
import Skill from '../models/skill'

export default class {
  static async getSkills(criteria?: any) {
    return Skill.findAndCountAll({
      where: criteria,
      raw: true,
    })
  }

  static async getSkill(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Skill.findOne({ where: criteria, raw: true, ...options })
  }

  static async getSkillById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Skill.findByPk(id, { raw: true, ...options })
  }

  static async getSkillsByIds(
    ids: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Skill.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async createSkill(data: Types.Skill) {
    return Skill.create(data)
  }

  static async updateSkill(id: number, data: Partial<Types.Skill>) {
    return Skill.update(data, {
      where: { id },
    })
  }
}
