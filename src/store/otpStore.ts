import { DataTypes, Model } from 'sequelize'
import { otpS } from '../db'

class OTPs extends Model {
  public otp!: string
  public token!: string
}

// add OTP expiry
OTPs.init(
  {
    token: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: otpS,
    modelName: 'otps',
    tableName: 'otps',
  },
)

async function setOTP(token: string, otp: string) {
  try {
    await OTPs.create({ token, otp })
    console.log(`OTP set for token: ${token}`)
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      await deleteOTP(token)
      return await setOTP(token, otp)
    }
    console.error('Error setting OTP:', error)
    throw error
  }
}

async function getOTP(token: string) {
  try {
    const otpRecord = await OTPs.findOne({ where: { token } })
    return otpRecord ? otpRecord.otp : null
  } catch (error) {
    console.error('Error getting OTP:', error)
    throw error
  }
}

async function deleteOTP(token: string) {
  try {
    const deletedCount = await OTPs.destroy({ where: { token } })
    if (deletedCount > 0) {
      console.log(`OTP deleted for token: ${token}`)
    } else {
      console.log(`No OTP found for token: ${token}`)
    }
  } catch (error) {
    console.error('Error deleting OTP:', error)
    throw error
  }
}

export { setOTP, getOTP, deleteOTP }
