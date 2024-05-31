import sqlize from '../sqlize'
import { DataTypes, Model } from 'sequelize'
import { SERVICE } from '../../config/enums'

class UserRole extends Model {
  public id!: number
  public userId!: string
  public roleId!: number
  public isActive?: boolean
  public approvedBy?: string
  public approvedAt?: number
  public createdBy?: SERVICE
  public updatedBy?: SERVICE
}

UserRole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    approvedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approvedAt: {
      type: DataTypes.DATE,
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
    modelName: 'userRole',
    tableName: 'userRoles',
    // indexes: [
    //   {
    //     name: 'user_vs_role',
    //     // unique: true,
    //     fields: ['userId', 'roleId'],
    //   },
    // ],
    defaultScope: {
      attributes: {
        exclude: [
          'approvedBy',
          'approvedAt',
          'createdBy',
          'createdAt',
          'updatedBy',
          'updatedAt',
        ],
      },
    },
  },
)

export default UserRole
