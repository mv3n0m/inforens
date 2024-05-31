import Role from '../models/role'
import { Types } from '../../config'

export default class {
  static async getRoles(criteria?: any) {
    return Role.findAndCountAll({
      where: criteria,
      raw: true,
    })
  }

  static async getRole(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Role.findOne({ where: criteria, raw: true, ...options })
  }

  static async getRoleById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Role.findByPk(id, { raw: true, ...options })
  }

  static async getRolesByIds(
    ids: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Role.findAndCountAll({ where: { id: ids }, raw: true, ...options })
  }

  static async createRole(data: Types.Role) {
    return Role.create(data)
  }

  static async updateRole(id: string, data: Partial<Types.Role>) {
    return Role.update(data, {
      where: { id },
    })
  }
}
