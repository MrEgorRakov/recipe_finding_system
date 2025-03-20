import { IntegerDataType } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  timestamps: false,
})
export class User extends Model {
  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    validate: {
      isEmail: true, // ✅ Validates that the value is an email
    },
  })
  email: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  phone_nubmer: IntegerDataType;
}
