import { EXPERIENCE_TAG } from '../../config/enums'
import sqlize from '../sqlize'
import { DataTypes, Model } from 'sequelize'

class Experience extends Model {
  public id!: number
  public userId!: string
  public title!: string
  public institutionName!: string
  public institutionAddress?: string
  public startDate!: string
  public endDate!: string
  public tag!: EXPERIENCE_TAG
}

Experience.init(
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    institutionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    institutionAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    universityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tag: {
      type: DataTypes.ENUM,
      values: Object.values(EXPERIENCE_TAG),
      allowNull: false,
    },
  },
  {
    sequelize: sqlize,
    modelName: 'experience',
    tableName: 'experienceDetails',
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

export default Experience
