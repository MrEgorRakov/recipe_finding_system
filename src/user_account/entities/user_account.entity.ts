import { Column, DataType, Model, Table } from 'sequelize-typescript';
@Table({
  tableName: 'user_account',
  timestamps: false,
})
export class User_Account extends Model {
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  User_recipe_id: number;

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
  User_recipe_name: string;
}
