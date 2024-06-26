import { Types } from '../../config'
import MiscUserData from '../models/miscUserData'

export default class {
  static async getMiscUserDatas(
    criteria?: any,
    options?: { attributes?: string[] },
  ) {
    return MiscUserData.findAndCountAll({
      where: criteria,
      raw: true,
      ...options,
    })
  }

  static async getMiscUserData(
    userId: string,
    options?: {
      attributes?: string[]
    },
  ) {
    return MiscUserData.findOne({
      where: { userId },
      raw: true,
      ...options,
    })
  }

  static async createMiscUserData(data: Types.MiscUserData) {
    return MiscUserData.create(data)
  }

  static async updateMiscUserData(data: Types.MiscUserData) {
    const { userId } = data
    const userData = await this.getMiscUserData(userId)
    if (userData) {
      return MiscUserData.update(data, {
        where: { userId },
      })
    }

    return await this.createMiscUserData(data)
  }
}
