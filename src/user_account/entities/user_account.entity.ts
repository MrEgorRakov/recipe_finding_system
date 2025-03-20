import { IntegerDataType } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
@Table({
  tableName: 'user_account',
  timestamps: false,
})
export class User_Account extends Model {
  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  phone_nubmer: IntegerDataType;
}
