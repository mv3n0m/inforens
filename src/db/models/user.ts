import sqlize from '../sqlize'
import { DataTypes, Model } from 'sequelize'
import { SERVICE } from '../../config/enums'

class User extends Model {
  public id!: string
  public firstName!: string
  public middleName?: string
  public lastName!: string
  public email!: string
  public mobileNumber!: string
  public password!: string
  public isActive?: boolean
  public createdBy?: SERVICE
  public updatedBy?: SERVICE
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.ENUM,
      values: Object.values(SERVICE),
      defaultValue: SERVICE.Core,
    },
    updatedBy: {
      type: DataTypes.ENUM,
      values: Object.values(SERVICE),
      allowNull: true,
    },
  },
  {
    sequelize: sqlize,
    modelName: 'user',
    tableName: 'users',
    defaultScope: {
      attributes: {
        exclude: [
          'password',
          'createdBy',
          'createdAt',
          'updatedBy',
          'updatedAt',
        ],
      },
    },
  },
)

export default User
