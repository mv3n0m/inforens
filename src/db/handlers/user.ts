import User from '../models/user'
import { Types } from '../../config'

export default class {
  static async getUsers(
    criteria?: any,
    options: {
      page: number
      perPage: number
    } = {
      page: 1,
      perPage: 10,
    },
  ) {
    const { page, perPage } = options
    const offset = (page - 1) * perPage
    const limit = perPage
    return User.findAndCountAll({
      where: criteria,
      offset,
      limit,
      raw: true,
    })
  }

  static async getUser(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return User.findOne({ where: criteria, raw: true, ...options })
  }

  static async getUserById(
    id: string,
    options?: {
      attributes?: string[]
    },
  ) {
    return User.findByPk(id, { raw: true, ...options })
  }

  static async getUsersByIds(
    ids: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return User.findAndCountAll({ where: { id: ids }, raw: true, ...options })
  }

  static async createUser(data: Types.UserQuery) {
    return User.create(data)
  }

  static async updateUser(id: string, data: Partial<Types.UserQuery>) {
    return User.update(data, {
      where: { id },
    })
  }
}
