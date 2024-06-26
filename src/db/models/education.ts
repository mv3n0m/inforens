import sqlize from '../sqlize'
import { DataTypes, Model } from 'sequelize'

class Education extends Model {
  public id!: number
  public userId!: string
  public countryCode!: string
  public regionId!: number
  public location?: string
  public levelId!: number
  public universityId!: number
  public institutionName?: string
  public disciplineId!: number
  public courseName?: string
  public startDate!: string
  public endDate!: string
  public result?: string
}

Education.init(
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
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    universityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    institutionName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    disciplineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: sqlize,
    modelName: 'education',
    tableName: 'educationDetails',
    defaultScope: {
      attributes: {
        exclude: [
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

export default Education
