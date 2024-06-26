import sqlize from '../sqlize'
import { DataTypes, Model } from 'sequelize'

class MiscUserData extends Model {
  public userId!: string
  public examData?: any
  public refereeDetails?: any
  public emergencyContactDetails?: any
}

MiscUserData.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    examData: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    refereeDetails: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    emergencyContactDetails: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize: sqlize,
    modelName: 'miscUserData',
    tableName: 'miscUserData',
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

export default MiscUserData
