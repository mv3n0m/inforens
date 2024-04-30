import sqlize from '../sqlize'
import { DataTypes, Model } from 'sequelize'
import { User } from '../../config/types'
import { SERVICE } from '../../config/enums'

class Role extends Model {
  public id!: number
  public name!: string
  public description?: string
  public isActive?: boolean
  public createdBy?: User
  public updatedBy?: User
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
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
    modelName: 'role',
    tableName: 'roles',
    defaultScope: {
      attributes: {
        exclude: ['createdBy', 'createdAt', 'updatedBy', 'updatedAt'],
      },
    },
  },
)

export default Role
