import sqlize from '../sqlize'
import { DataTypes, Model } from 'sequelize'
import { SERVICE } from '../../config/enums'

class GuideProfile extends Model {
  public userId!: string
  public universityEmail!: string
  public countryCode!: string
  public universityId!: number
  public levelId!: number
  public disciplineId!: number
  public courseName?: string
  public yearOfCompletion!: number
  public introVidUrl?: string
  public aboutMe?: string
  public skillIds?: Array<number>
  public languageIds?: Array<number>
  public interestIds?: Array<number>
  public createdBy?: SERVICE | string
  public updatedBy?: SERVICE | string
}

GuideProfile.init(
  {
    userId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    universityEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    universityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    disciplineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    yearOfCompletion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    introVidUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    aboutMe: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    skillIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    languageIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    interestIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
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
    modelName: 'guideProfile',
    tableName: 'guideProfiles',
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

export default GuideProfile
