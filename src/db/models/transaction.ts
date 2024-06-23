import sqlize from '../sqlize'
import { DataTypes, Model } from 'sequelize'
import { PAYMENT_STATUS, TRANSACTION_TYPE } from '../../config/enums'

class Payment extends Model {
  public id!: string
  public paymentId?: string
  public amount!: number
  public currency!: string
  public transactionType!: TRANSACTION_TYPE
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
    paymentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transactionType: {
      type: DataTypes.ENUM,
      values: Object.values(TRANSACTION_TYPE),
      allowNull: true,
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
