import { Sequelize } from 'sequelize'
import { logger } from '../utils'

const otpS = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: './session.sqlite',
})

;(async () => {
  try {
    // create tables if they do not exist
    await otpS.sync({ alter: false, logging: false })
    logger.info('OTP tables synced successfully.')
  } catch (error) {
    logger.error('Error creating otp tables:', error)
  }
})()

export { otpS }
