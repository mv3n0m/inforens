import {
  AddressDbHandler,
  EducationDbHandler,
  ExperienceDbHandler,
  MiscUserDataDbHandler,
  UserDbHandler,
  UserFileDbHandler,
  UserPreferencesDbHandler,
  UserRoleDbHandler,
} from '../db/handlers'
import { Types } from '../config'
import { _jwt, encryptPassword, logger, uuid } from '../utils'
import { Op } from 'sequelize'
import { FILE_TAG, SERVICE, USER_ROLE } from '../config/enums'
import sqlize from '../db/sqlize'
import { buildFileKey, getSignedUrl, uploadFileToS3 } from '../utils/awsHelpers'

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

  static async getUser(data: Partial<Types.UserQuery>, attributes?: string[]) {
    const user = await UserDbHandler.getUser(data, { attributes })
    if (!user) {
      logger.error('User not found')
      throw new Error('USER_NOT_FOUND')
    }
    return user
  }

  static async getUserById(id: string) {
    const user = await UserDbHandler.getUserById(id, {
      attributes: ['firstName', 'lastName', 'email', 'mobileNumber'],
    })
    if (!user) {
      logger.error('User not found')
      throw new Error('USER_NOT_FOUND')
    }
    return user
  }

  static async getApprovedGuides() {
    const [results, metadata] = await sqlize.query(
      `SELECT u."firstName", u."lastName", u.email, u."mobileNumber", u.country, u.bio
        FROM users u
        JOIN "userRoles" ur ON u.id = ur."userId"
        JOIN roles r ON ur."roleId" = r.id
        WHERE u."isActive" = true
          AND ur."approvedAt" IS NOT NULL
          AND r.name = 'Guide';`,
    )

    return { count: (metadata as any).rowCount, rows: results }
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

    // TODO: use UUID7 if possible
    const id = uuid()
    const password = encryptPassword(data.password)
    await UserDbHandler.createUser({ ...data, id, password })
    // AuditLogDBService.create(auditLog).catch((err) => logger.error(err))
    return {
      msg: 'User created successfully.',
      statusCode: 201,
      accessToken: _jwt.createToken({ id, origin: 'initial' }),
    }
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
      isActive: userRole !== USER_ROLE.Guide,
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

  static async setUserPreferences(data: Types.UserPreferences) {
    // need to sanitise each and every data key by checking in db
    const query = { ...data, createdBy: data.userId }
    await UserPreferencesDbHandler.createUserPreferences(query)

    return { msg: 'User preferences set successfully', statusCode: 201 }
  }

  static async getUserPreferences(userId: string) {
    const response = await UserPreferencesDbHandler.getUserPreferencesByUserId(
      userId,
    )

    return response
  }

  static async updateUserPreferences(
    userId: string,
    data: Partial<Types.UserPreferencesQuery>,
  ) {
    // need to sanitise each and every data key by checking in db
    const query = { ...data, updatedBy: userId }
    await UserPreferencesDbHandler.updateUserPreferences(userId, query)

    return { msg: 'User preferences updated successfully' }
  }

  static async updateUserProfile(userId: string, data: Types.UserProfileQuery) {
    await UserDbHandler.updateUserProfile(userId, data)
    return { msg: 'User profile updated successfully' }
  }

  static async getUserProfile(userId: string) {
    const response = await UserDbHandler.getUserProfile(userId)

    return response
  }

  static async updateUserMiscData(data: Types.MiscUserData) {
    await MiscUserDataDbHandler.updateMiscUserData(data)
    return { msg: 'User profile updated successfully' }
  }

  static async getUserMiscData(userId: string, key: string) {
    const response = await MiscUserDataDbHandler.getMiscUserData(userId, {
      attributes: [key],
    })

    return (response as any)?.[key]
  }

  static async updateUserFile(file: any, data: Types.UserFile) {
    const { userId, tag } = data

    const uploadResult = await uploadFileToS3(file, userId, tag + '-')
    const fileKey = uploadResult.Key.split('/').pop()?.split('-').pop() || ''

    await UserFileDbHandler.updateUserFile({
      ...data,
      fileKey,
      createdBy: userId,
      updatedBy: userId,
    })
    return { msg: 'User file updated successfully' }
  }

  static async getUserFiles(userId: string, options?: { tag: FILE_TAG }) {
    const response = options?.tag
      ? await UserFileDbHandler.getUserFileByUserIdAndTag(userId, options.tag)
      : await UserFileDbHandler.getUserFilesByUserId(userId)

    const userFiles = response.rows.map((row) => ({
      signedUrl: getSignedUrl(
        buildFileKey(row.fileKey, userId, row.tag + '-'),
        60 * 5,
      ),
      ...row,
    }))

    return { count: response.count, rows: userFiles }
  }

  static async addUserAddress(data: Types.Address) {
    await AddressDbHandler.createAddress(data)

    return { msg: `User's ${data.tag} address added successfully` }
  }

  static async updateUserAddress(
    id: number,
    userId: string,
    data: Partial<Types.Address>,
  ) {
    const { tag } = data
    if (!tag) {
      logger.error('Tag is a required field')
      throw new Error()
    }

    // check for address existence according to tag
    await AddressDbHandler.updateAddress(id, userId, data)

    return { msg: `User's ${tag} address updated successfully` }
  }

  static async getUserAddresses(userId: string) {
    const response = await AddressDbHandler.getAddressesByUserId(userId)

    return response
  }

  static async addUserEducation(data: Types.Education) {
    await EducationDbHandler.createEducation(data)

    return { msg: `User's education added successfully` }
  }

  static async updateUserEducation(
    id: number,
    userId: string,
    data: Partial<Types.Education>,
  ) {
    const { levelId } = data
    if (!levelId) {
      logger.error('levelId is a required field')
      throw new Error()
    }
    // check for education existence according to levelId
    await EducationDbHandler.updateEducation(id, userId, data)

    return { msg: `User's education updated successfully` }
  }

  static async getUserEducations(userId: string) {
    const response = await EducationDbHandler.getEducationsByUserId(userId)

    return response
  }

  static async addUserExperience(data: Types.Experience) {
    await ExperienceDbHandler.createExperience(data)

    return { msg: `User's experience added successfully` }
  }

  static async updateUserExperience(
    id: number,
    userId: string,
    data: Partial<Types.Experience>,
  ) {
    const { tag } = data
    if (!tag) {
      logger.error('Tag is a required field')
      throw new Error()
    }
    // check for experience existence according to tag/id
    await ExperienceDbHandler.updateExperience(id, userId, data)

    return { msg: `User's experience updated successfully` }
  }

  static async getUserExperiences(userId: string) {
    const response = await ExperienceDbHandler.getExperiencesByUserId(userId)

    return response
  }
}
