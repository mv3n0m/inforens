import {
  UserDbHandler,
  UserRoleDbHandler, // AuditLogDBService
} from '../db/handlers'
import { Types } from '../config'
import { encryptPassword, logger, uuid } from '../utils'
import { Op } from 'sequelize'
import { AccountService } from '.'
import { SERVICE, USER_ROLE } from '../config/enums'

export default class {
  static async getUsers() {
    const users = await UserDbHandler.getUsers()
    // if (user) {
    //   const auditLog: IAuditLog = {
    //     id: uuid(),
    //     cognitoId,
    //     event: AuditLogEvent.UserLoggedIn,
    //     data: JSON.stringify({ timestamp: Date.now() }),
    //   }
    //   AuditLogDBService.create(auditLog).catch((err) => logger.error(err))
    // }
    return users
  }

  static async getUser(data: Partial<Types.UserQuery>) {
    const user = await UserDbHandler.getUser(data)
    if (!user) {
      logger.error('User not found')
      throw new Error('USER_NOT_FOUND')
    }
    return user
  }

  static async getUserById(id: string) {
    const user = await UserDbHandler.getUserById(id)
    if (!user) {
      logger.error('User not found')
      throw new Error('USER_NOT_FOUND')
    }
    return user
  }

  static async createUser(data: Types.User) {
    const { mobileNumber, email } = data
    const userExists = await UserDbHandler.getUser({
      [Op.or]: [{ mobileNumber }, { email }],
    })
    if (userExists) {
      logger.error('User already exists')
      logger.info(userExists)
      throw new Error('USER_EXISTS')
    }

    const id = uuid()
    const password = encryptPassword(data.password)
    await UserDbHandler.createUser({ ...data, id, password })
    const response = await AccountService.generateOtp({ email })
    // AuditLogDBService.create(auditLog).catch((err) => logger.error(err))
    return { id, ...response }
  }

  static async setUserRole(data: Types.UserRole & { userRole: USER_ROLE }) {
    const { userRole, userId, roleId } = data
    const _userRole = await UserRoleDbHandler.getUserRole({
      [Op.and]: [{ userId }, { roleId }],
    })
    if (_userRole) {
      logger.error('User role already declared')
      throw new Error('USERROLE_ALREADY_SET')
    }

    await UserRoleDbHandler.createUserRole({
      userId,
      roleId,
      isActive: userRole !== USER_ROLE.Mentor,
    })
    return { msg: 'User role set successfully' }
  }

  static async updateUser(id: string, data: Partial<Types.User>) {
    const query = { ...data, updatedBy: SERVICE.Core }
    await UserDbHandler.updateUser(id, query)

    return { msg: 'User updated successfully' }
  }

  static async updateUserStatus(
    id: string,
    data: { isActive: boolean } = { isActive: true },
  ) {
    await this.updateUser(id, data)

    return { msg: 'User status updated successfully' }
  }
}
