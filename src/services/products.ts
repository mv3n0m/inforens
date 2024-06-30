import { ProductDbHandler, TaskDbHandler } from '../db/handlers'

export default class {
  static async getProductsAndTasks(criteria?: any) {
    const products = await ProductDbHandler.getProducts({
      ...criteria,
      isActive: true,
    })

    const tasksPromises = products.rows.map(async (product) => {
      const { taskIds } = product
      delete product['taskIds']
      let result: any = { ...product }

      if (taskIds) {
        result['tasks'] = await TaskDbHandler.getTasksByIds(taskIds)
      }
      return result
    })

    const response = {
      count: products.count,
      rows: await Promise.all(tasksPromises),
    }
    return response
  }
}
