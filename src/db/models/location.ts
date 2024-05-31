import sqlize from '../sqlize'
import { DataTypes, Model } from 'sequelize'
import { SERVICE } from '../../config/enums'

class Location extends Model {
  public id!: number
  public countryId!: number
  public name!: string
  public code!: string
  public isActive?: boolean
  public createdBy?: string | SERVICE
  public updatedBy?: string | SERVICE
}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'location',
    tableName: 'locations',
    defaultScope: {
      attributes: {
        exclude: ['createdBy', 'createdAt', 'updatedBy', 'updatedAt'],
      },
    },
  },
)

export default Location
