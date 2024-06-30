import { Types } from '../../config'
import Product from '../models/product'

export default class {
  static async getProducts(criteria?: any) {
    return Product.findAndCountAll({
      where: criteria,
      raw: true,
    })
  }

  static async getProduct(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Product.findOne({ where: criteria, raw: true, ...options })
  }

  static async getProductById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Product.findByPk(id, { raw: true, ...options })
  }

  static async getProductsByIds(
    ids: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Product.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async createProduct(data: Types.Product) {
    return Product.create(data)
  }

  static async updateProduct(id: number, data: Partial<Types.ProductQuery>) {
    return Product.update(data, {
      where: { id },
    })
  }
}
