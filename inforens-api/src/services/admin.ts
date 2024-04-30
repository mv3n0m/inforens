import { Types } from '../config'
import { RoleDbHandler } from '../db/handlers'
import { logger } from '../utils'

export default class {
  static async getRoleByName(name: string) {
    const role = await RoleDbHandler.getRole({ name })
    return role
  }

  static async fetchRoles() {
    const roles = await RoleDbHandler.getRoles()
    return roles
  }

  static async createRole(data: Types.Role) {
    const { name } = data
    const roleExists = await this.getRoleByName(name)
    if (roleExists) {
      logger.error('Role already exists')
      logger.info(roleExists)
      throw new Error('ROLE_EXISTS')
    }

    await RoleDbHandler.createRole(data)
    return { msg: 'Role created successfully' }
  }
}
