import UserRole from '../models/userRole'
import { Types } from '../../config'

export default class {
  static async getUserRole(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return UserRole.findOne({ where: criteria, raw: true, ...options })
  }

  static async getUserRolesByUserId(
    userId: string,
    options?: {
      attributes?: string[]
    },
  ) {
    return UserRole.findAndCountAll({
      where: { userId },
      raw: true,
      ...options,
    })
  }

  static async getUserRolesByRoleId(
    roleId: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return UserRole.findAndCountAll({
      where: { roleId },
      raw: true,
      ...options,
    })
  }

  static async createUserRole(data: Types.UserRole) {
    return UserRole.create(data)
  }

  // maybe this will never be required
  static async updateUserRole(id: number, data: Partial<Types.UserRole>) {
    return UserRole.update(data, {
      where: { id },
    })
  }
}
