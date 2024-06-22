import sqlize from '../sqlize'
import { DataTypes, Model } from 'sequelize'
import { FILE_TAG, SERVICE } from '../../config/enums'

class UserFile extends Model {
  public id!: number
  public userId!: string
  public fileKey!: string
  public tag!: FILE_TAG
  public createdBy?: string | SERVICE
  public updatedBy?: string | SERVICE
}

UserFile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag: {
      type: DataTypes.ENUM,
      values: Object.values(FILE_TAG),
      allowNull: false,
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
    modelName: 'userFile',
    tableName: 'userFiles',
    defaultScope: {
      attributes: {
        exclude: ['userId', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
      },
    },
  },
)

export default UserFile
