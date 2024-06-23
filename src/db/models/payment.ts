import sqlize from '../sqlize'
import { DataTypes, Model } from 'sequelize'
import { PAYMENT_STATUS } from '../../config/enums'

class Payment extends Model {
  public id!: string
  public referenceId!: string
  public amount!: number
  public currency!: string
  public status?: PAYMENT_STATUS
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    referenceId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(PAYMENT_STATUS),
      defaultValue: PAYMENT_STATUS.Pending,
    },
  },
  {
    sequelize: sqlize,
    modelName: 'payment',
    tableName: 'payments',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  },
)

export default Payment
