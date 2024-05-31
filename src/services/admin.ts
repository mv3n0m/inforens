import { Op } from 'sequelize'
import { Types } from '../config'
import {
  CountryDbHandler,
  LocationDbHandler,
  RoleDbHandler,
} from '../db/handlers'
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
    return { msg: 'Country created successfully' }
  }

  static async createLocation(data: Types.Location) {
    const { name, code } = data
    const locationExists = await LocationDbHandler.getLocation({
      [Op.or]: [{ name }, { code }],
    })
    if (locationExists) {
      logger.error('Location already exists')
      logger.info(locationExists)
      throw new Error('LOCATION_EXISTS')
    }

    await LocationDbHandler.createLocation(data)
    return { msg: 'Location created successfully' }
  }
}
