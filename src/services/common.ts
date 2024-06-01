import {
  CountryDbHandler,
  LocationDbHandler,
  UniversityDbHandler,
} from '../db/handlers'

export default class {
  // static async getRoleByName(name: string) {
  //   const role = await RoleDbHandler.getRole({ name })
  //   return role
  // }

  static async fetchCountries() {
    const countries = await CountryDbHandler.getCountries(
      { isActive: true },
      {
        attributes: ['code', 'name'],
      },
    )
    return countries
  }

  static async fetchLocations(countryCode: string) {
    const countries = await LocationDbHandler.getLocationsByCountryCode(
      countryCode,
      { isActive: true },
      {
        attributes: ['id', 'name'],
      },
    )
    return countries
  }

  static async fetchUniversities(locationIds: number[]) {
    const universities = await UniversityDbHandler.getUniversitiesByLocationIds(
      locationIds,
      { isActive: true },
      {
        attributes: ['id', 'name', 'locationId'],
      },
    )
    return universities
  }

  // static async createRole(data: Types.Role) {
  //   const { name } = data
  //   const roleExists = await this.getRoleByName(name)
  //   if (roleExists) {
  //     logger.error('Role already exists')
  //     logger.info(roleExists)
  //     throw new Error('ROLE_EXISTS')
  //   }

  //   await RoleDbHandler.createRole(data)
  //   return { msg: 'Role created successfully' }
  // }

  // static async createCountry(data: Types.Country) {
  //   const { name, code } = data
  //   const countryExists = await CountryDbHandler.getCountry({
  //     [Op.or]: [{ name }, { code }],
  //   })
  //   if (countryExists) {
  //     logger.error('Country already exists')
  //     logger.info(countryExists)
  //     throw new Error('COUNTRY_EXISTS')
  //   }

  //   await CountryDbHandler.createCountry(data)
  //   return { msg: 'Country created successfully' }
  // }

  // static async createLocation(data: Types.Location) {
  //   const { name, code } = data
  //   const locationExists = await LocationDbHandler.getLocation({
  //     [Op.or]: [{ name }, { code }],
  //   })
  //   if (locationExists) {
  //     logger.error('Location already exists')
  //     logger.info(locationExists)
  //     throw new Error('LOCATION_EXISTS')
  //   }

  //   await LocationDbHandler.createLocation(data)
  //   return { msg: 'Location created successfully' }
  // }
}
