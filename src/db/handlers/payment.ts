import { Types } from '../../config'
import Payment from '../models/payment'

export default class {
  static async getPayments(criteria?: any) {
    return Payment.findAndCountAll({
      where: criteria,
      raw: true,
    })
  }

  static async getPayment(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Payment.findOne({ where: criteria, raw: true, ...options })
  }

  static async getPaymentById(
    id: string,
    options?: {
      attributes?: string[]
    },
  ) {
    return Payment.findByPk(id, { raw: true, ...options })
  }

  static async getPaymentByReferenceId(
    referenceId: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Payment.findOne({ where: { referenceId }, raw: true, ...options })
  }

  static async getPaymentsByIds(
    ids: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Payment.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async createPayment(data: Types.Payment) {
    return Payment.create(data)
  }

  static async updatePayment(id: string, data: Partial<Types.Payment>) {
    return Payment.update(data, {
      where: { id },
    })
  }

  static async updatePaymentByReferenceId(
    referenceId: string,
    data: Partial<Types.Payment>,
  ) {
    return Payment.update(data, {
      where: { referenceId },
    })
  }
}
