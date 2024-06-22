import UserFile from '../models/userFile'
import { Types } from '../../config'
import { FILE_TAG } from '../../config/enums'

export default class {
  static async getUserFilesList(
    criteria?: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return UserFile.findOne({ where: criteria, raw: true, ...options })
  }

  static async getUserFilesByUserId(
    userId: string,
    options?: {
      attributes?: string[]
    },
  ) {
    return UserFile.findAndCountAll({
      where: { userId },
      raw: true,
      ...options,
    })
  }

  static async getUserFileByUserIdAndTag(
    userId: string,
    tag: FILE_TAG,
    options?: {
      attributes?: string[]
    },
  ) {
    return UserFile.findAndCountAll({
      where: { userId, tag },
      raw: true,
      ...options,
    })
  }

  static async createUserFile(data: Types.UserFile) {
    return UserFile.create(data)
  }

  static async updateUserFile(data: Types.UserFileQuery) {
    const { userId, tag } = data

    const userData = await this.getUserFileByUserIdAndTag(userId, tag)
    if (userData?.count) {
      return UserFile.update(data, {
        where: { userId, tag },
      })
    }
    return await this.createUserFile(data)
  }
}
