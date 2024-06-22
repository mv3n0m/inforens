import { GuideProfileDbHandler } from '../db/handlers'
import { Types } from '../config'
import { _jwt, logger } from '../utils'

export default class {
  static async getGuideProfile(userId: string) {
    const guide = await GuideProfileDbHandler.getGuideProfileByUserId(userId)
    if (!guide) {
      logger.error('Guide not found')
      throw new Error('USER_NOT_FOUND')
    }
    return guide
  }

  static async createGuideProfile(data: Types.GuideProfile) {
    const guideProfileExists =
      await GuideProfileDbHandler.getGuideProfileByUserId(data.userId)

    if (guideProfileExists) {
      logger.error('Guide profile already exists')
      logger.info(guideProfileExists)
      throw new Error('GP_EXISTS')
    }

    await GuideProfileDbHandler.createGuideProfile(data)
    return { msg: 'Guide profile created successfully', statusCode: 201 }
  }

  static async updateGuideProfile(
    userId: string,
    data: Partial<Types.GuideProfile>,
  ) {
    const guideProfileExists =
      await GuideProfileDbHandler.getGuideProfileByUserId(userId)

    if (!guideProfileExists) {
      logger.error("Guide profile doesn't exist")
      logger.info(guideProfileExists)
      throw new Error('GP_NOT_FOUND')
    }
    await GuideProfileDbHandler.updateGuideProfile(userId, {
      ...data,
    })

    return { msg: `Guide's profile updated successfully` }
  }
}
