import { Column, DataType, Model, Table } from 'sequelize-typescript';
@Table({
  tableName: 'UserAccount',
  timestamps: false,
})
export class UserAccount extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  UserRecipeName: string;
}
