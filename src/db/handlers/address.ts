import { Types } from '../../config'
import Address from '../models/address'

export default class {
  static async getAddresses(
    criteria?: any,
    options?: { attributes?: string[] },
  ) {
    return Address.findAndCountAll({
      where: criteria,
      raw: true,
      ...options,
    })
  }

  static async getAddress(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Address.findOne({ where: criteria, raw: true, ...options })
  }

  static async getAddressById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Address.findByPk(id, { raw: true, ...options })
  }

  static async getAddressesByIds(
    ids: number[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Address.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async getAddressesByUserId(
    userId: string,
    options?: {
      attributes?: string[]
    },
  ) {
    return Address.findAndCountAll({
      where: { userId },
      raw: true,
      ...options,
    })
  }

  static async createAddress(data: Types.Address) {
    return Address.create(data)
  }

  static async updateAddress(
    id: number,
    userId: string,
    data: Partial<Types.Address>,
  ) {
    return Address.update(data, {
      where: { id, userId },
    })
  }
}
