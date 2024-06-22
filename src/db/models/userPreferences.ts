import sqlize from '../sqlize'
import { DataTypes, Model } from 'sequelize'
import { SERVICE } from '../../config/enums'

class UserPreferences extends Model {
  public userId!: string
  public countryCode!: string
  public regionIds?: Array<number>
  public levelIds?: Array<number>
  public disciplineIds?: Array<number>
  public universityIds?: Array<number>
  public isActive?: boolean
  public createdBy?: string | SERVICE
  public updatedBy?: string | SERVICE
}

UserPreferences.init(
  {
    userId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regionIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    levelIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    disciplineIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    universityIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      defaultValue: SERVICE.Core,
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sqlize,
    modelName: 'userPreference',
    tableName: 'userPreferences',
    defaultScope: {
      attributes: {
        exclude: [
          'id',
          'userId',
          'isActive',
          'createdBy',
          'createdAt',
          'updatedBy',
          'updatedAt',
        ],
      },
    },
  },
)

export default UserPreferences
