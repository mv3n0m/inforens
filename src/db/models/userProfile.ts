import sqlize from '../sqlize'
import { DataTypes, Model } from 'sequelize'
import { USER_STAGE } from '../../config/enums'

class UserProfile extends Model {
  public userId!: string
  public gender?: string
  public dateOfBirth?: string
  public countryOfBirth?: string
  public nationality?: string
  public nativeLanguage?: string
  public bio?: string
  public stage?: USER_STAGE
  public otherContacts?: Array<any>
  // remove later
  public emergencyContactDetails?: {
    name: string
    mobileNumber: string
    email: string
    relation: string
  }
}

UserProfile.init(
  {
    userId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    countryOfBirth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nativeLanguage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    stage: {
      type: DataTypes.ENUM,
      values: Object.values(USER_STAGE),
      allowNull: true,
    },
    otherContacts: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    emergencyContactDetails: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize: sqlize,
    modelName: 'userProfile',
    tableName: 'userProfiles',
    defaultScope: {
      attributes: {
        exclude: ['userId', 'createdAt', 'updatedAt'],
      },
    },
  },
)

export default UserProfile
