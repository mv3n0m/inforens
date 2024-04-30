import { Sequelize } from 'sequelize'
import { logger } from '../utils'
import { dbCreds } from '../envt'

const sqlize = new Sequelize({
  dialect: 'postgres',
  ...dbCreds,
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time, in milliseconds, that a connection can be idle before being released
    idle: 10000, // Maximum time, in milliseconds, that a connection can remain open in the pool
  },
  logging: false, // Disable logging, since we'll be using logger library
})

;(async () => {
  try {
    // create tables if they do not exist
    await sqlize.sync({ alter: false, logging: false })
    logger.info('Tables created successfully.')
  } catch (error) {
    logger.error('Error creating tables:', error)
  }
})()

export default sqlize
