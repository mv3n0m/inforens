import { DataTypes, Model } from 'sequelize'
import { otpS } from '../db'
import { otpExpiryInMinutes } from '../envt'

class OTPs extends Model {
  public otp!: string
  public token!: string
  public expiry!: number
  public reference?: string
  public verified?: boolean
}

// add OTP expiry
OTPs.init(
  {
    token: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => new Date(Date.now() + 10 * 60 * 1000),
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    sequelize: otpS,
    modelName: 'otps',
    tableName: 'otps',
  },
)

async function setOTP(token: string, otp: string, reference?: string) {
  try {
    const expiry = new Date(Date.now() + otpExpiryInMinutes * 60 * 1000)

    await OTPs.create({ token, otp, expiry, reference })
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
    console.log('otp', otpRecord)
    if (!otpRecord || otpRecord.verified) throw new Error('INVALID_TOKEN')
    if (otpRecord.expiry <= +new Date()) {
      await deleteOTP(token)
      throw new Error('OTP_EXPIRED')
    }

    return otpRecord
  } catch (error) {
    console.error('Error getting OTP:', error)
    throw error
  }
}

async function updateStatus(token: string, verified?: boolean) {
  try {
    await OTPs.update({ verified }, { where: { token } })
  } catch (error) {
    console.error('Error updating OTP:', error)
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

async function deleteOTPByReference(reference: string) {
  try {
    const deletedCount = await OTPs.destroy({ where: { reference } })
    if (deletedCount > 0) {
      console.log(`OTP deleted for reference: ${reference}`)
    } else {
      throw new Error('MOB_VER')
    }
  } catch (error) {
    console.error('Error deleting OTP:', error)
    throw error
  }
}

export { setOTP, getOTP, deleteOTP, deleteOTPByReference, updateStatus }
