import sqlize from '../sqlize'
import { DataTypes, Model } from 'sequelize'
import { SERVICE } from '../../config/enums'

class Course extends Model {
  public id!: number
  public code!: string
  public name!: string
  public levelId!: number
  public universityId!: number
  public description?: string
  public isActive?: boolean
  public createdBy?: string | SERVICE
  public updatedBy?: string | SERVICE
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    universityId: {
      type: DataTypes.INTEGER,
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
    modelName: 'course',
    tableName: 'courses',
    defaultScope: {
      attributes: {
        exclude: [
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

export default Course
