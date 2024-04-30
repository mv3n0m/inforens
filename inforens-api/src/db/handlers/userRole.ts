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
    return UserRole.findAll({ where: { userId }, raw: true, ...options })
  }

  static async getUserRolesByRoleId(
    roleId: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return UserRole.findAll({ where: { roleId }, raw: true, ...options })
  }

  static async createUserRole(data: Types.UserRole) {
    return UserRole.create(data)
  }

  // maybe this will never be required
  static async updateUserRole(id: string, data: Partial<Types.UserRole>) {
    return UserRole.update(data, {
      where: { id },
    })
  }
}
