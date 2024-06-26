import sqlize from '../sqlize'
import { DataTypes, Model } from 'sequelize'
import { ADDRESS_TAG } from '../../config/enums'

class Address extends Model {
  public id!: number
  public userId!: string
  public address1!: string
  public address2?: string
  public countryCode!: string
  public state!: string
  public postCode!: string
  public city!: string
  public tag!: ADDRESS_TAG
}

Address.init(
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
    address1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag: {
      type: DataTypes.ENUM,
      values: Object.values(ADDRESS_TAG),
      allowNull: false,
    },
  },
  {
    sequelize: sqlize,
    modelName: 'address',
    tableName: 'addresses',
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

export default Address
