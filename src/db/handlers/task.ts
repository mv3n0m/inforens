import { Types } from '../../config'
import Task from '../models/task'

export default class {
  static async getTasks(criteria?: any) {
    return Task.findAndCountAll({
      where: criteria,
      raw: true,
    })
  }

  static async getTask(
    criteria: any,
    options?: {
      attributes?: string[]
    },
  ) {
    return Task.findOne({ where: criteria, raw: true, ...options })
  }

  static async getTaskById(
    id: number,
    options?: {
      attributes?: string[]
    },
  ) {
    return Task.findByPk(id, { raw: true, ...options })
  }

  static async getTasksByIds(
    ids: string[],
    options?: {
      attributes?: string[]
    },
  ) {
    return Task.findAndCountAll({
      where: { id: ids },
      raw: true,
      ...options,
    })
  }

  static async createTask(data: Types.Task) {
    return Task.create(data)
  }

  static async updateTask(id: number, data: Partial<Types.TaskQuery>) {
    return Task.update(data, {
      where: { id },
    })
  }
}
