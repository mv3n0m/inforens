import UserPreferences from '../models/userPreferences'
import { Types } from '../../config'

export default class {
  static async getUserPreferences(
    criteria?: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return UserPreferences.findOne({ where: criteria, raw: true, ...options })
  }

  static async getUserPreferencesByUserId(
    userId: string,
    options?: {
      attributes?: string[]
    },
  ) {
    return UserPreferences.findOne({
      where: { userId },
      raw: true,
      ...options,
    })
  }

  static async createUserPreferences(data: Types.UserPreferences) {
    return UserPreferences.create(data)
  }

  // maybe this will never be required
  static async updateUserPreferences(
    id: string,
    data: Partial<Types.UserPreferences>,
  ) {
    return UserPreferences.update(data, {
      where: { id },
    })
  }
}
