import { Op } from 'sequelize'
import { Types } from '../config'
import {
  CountryDbHandler,
  DisciplineDbHandler,
  InterestDbHandler,
  LanguageDbHandler,
  LevelDbHandler,
  ProductDbHandler,
  RegionDbHandler,
  RoleDbHandler,
  SkillDbHandler,
  TaskDbHandler,
  UniversityDbHandler,
  UserRoleDbHandler,
} from '../db/handlers'
import { getPgTimestamp, logger } from '../utils'
import { SERVICE, USER_STAGE } from '../config/enums'

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
    return { msg: 'Role created successfully', statusCode: 201 }
  }

  static async createCountry(data: Types.Country) {
    const { name, code } = data
    const countryExists = await CountryDbHandler.getCountry({
      [Op.or]: [{ name }, { code }],
    })
    if (countryExists) {
      logger.error('Country already exists')
      logger.info(countryExists)
      throw new Error('COUNTRY_EXISTS')
    }

    await CountryDbHandler.createCountry(data)
    return { msg: 'Country created successfully', statusCode: 201 }
  }

  static async createRegion(data: Types.Region) {
    const { name, countryCode } = data
    const regionExists = await RegionDbHandler.getRegion({
      [Op.and]: [{ name }, { countryCode }],
    })
    if (regionExists) {
      logger.error('Region already exists')
      logger.info(regionExists)
      throw new Error('REGION_EXISTS')
    }

    await RegionDbHandler.createRegion(data)
    return { msg: 'Region created successfully', statusCode: 201 }
  }

  static async createUniversity(data: Types.University) {
    const { name, regionId } = data
    const universityExists = await UniversityDbHandler.getUniversity({
      [Op.and]: [{ name }, { regionId }],
    })
    if (universityExists) {
      logger.error('University already exists')
      logger.info(universityExists)
      throw new Error('UNIVERSITY_EXISTS')
    }

    await UniversityDbHandler.createUniversity(data)
    return { msg: 'University created successfully', statusCode: 201 }
  }

  static async createLevel(data: Types.Level) {
    const levelExists = await LevelDbHandler.getLevel(data)
    if (levelExists) {
      logger.error('Level already exists')
      logger.info(levelExists)
      throw new Error('LEVEL_EXISTS')
    }

    await LevelDbHandler.createLevel(data)
    return { msg: 'Level created successfully' }
  }

  static async createDiscipline(data: Types.Discipline) {
    const disciplineExists = await DisciplineDbHandler.getDiscipline(data)
    if (disciplineExists) {
      logger.error('Discipline already exists')
      logger.info(disciplineExists)
      throw new Error('DISCIPLINE_EXISTS')
    }

    await DisciplineDbHandler.createDiscipline(data)
    return { msg: 'Discipline created successfully', statusCode: 201 }
  }

  static async createSkill(data: Types.Skill) {
    const skillExists = await SkillDbHandler.getSkill(data)
    if (skillExists) {
      logger.error('Skill already exists')
      logger.info(skillExists)
      throw new Error('SKILL_EXISTS')
    }

    await SkillDbHandler.createSkill(data)
    return { msg: 'Skill created successfully', statusCode: 201 }
  }

  static async createLanguage(data: Types.Language) {
    const languageExists = await LanguageDbHandler.getLanguage(data)
    if (languageExists) {
      logger.error('Language already exists')
      logger.info(languageExists)
      throw new Error('LANGUAGE_EXISTS')
    }

    await LanguageDbHandler.createLanguage(data)
    return { msg: 'Language created successfully', statusCode: 201 }
  }

  static async createInterest(data: Types.Interest) {
    const interestExists = await InterestDbHandler.getInterest(data)
    if (interestExists) {
      logger.error('Interest already exists')
      logger.info(interestExists)
      throw new Error('INTEREST_EXISTS')
    }

    await InterestDbHandler.createInterest(data)
    return { msg: 'Interest created successfully', statusCode: 201 }
  }

  static async createProduct(data: Types.Product) {
    await ProductDbHandler.createProduct(data)
    return { msg: 'Product created successfully', statusCode: 201 }
  }

  static async updateProduct(
    productId: number,
    data: Partial<Types.ProductQuery>,
  ) {
    await ProductDbHandler.updateProduct(productId, data)
    return { msg: 'Product updated successfully' }
  }

  static async updateProductTasks(productId: number, taskIds: Array<number>) {
    await ProductDbHandler.updateProduct(productId, { taskIds })
    return { msg: 'Tasks linked to product successfully' }
  }

  static async createTask(data: Types.Task) {
    await TaskDbHandler.createTask(data)
    return { msg: 'Task created successfully', statusCode: 201 }
  }

  static async updateTask(taskId: number, data: Partial<Types.TaskQuery>) {
    await TaskDbHandler.updateTask(taskId, data)
    return { msg: 'Product updated successfully' }
  }

  static async approveGuide(userId: string) {
    const guideRole = await RoleDbHandler.getRole({ name: 'Guide' })
    const userRoleExists = await UserRoleDbHandler.getUserRole({
      userId,
      roleId: guideRole?.id,
    })
    if (!userRoleExists) {
      logger.error('User role not found.')
      logger.info(userRoleExists)
      throw new Error('USER_NOT_A_GUIDE')
    }

    await UserRoleDbHandler.updateUserRole(userRoleExists.id, {
      approvedAt: +new Date(),
      // update this to use admin/staff user id from jwt
      approvedBy: SERVICE.Core,
    })
    return { msg: 'Guide approved successfully' }
  }
}
