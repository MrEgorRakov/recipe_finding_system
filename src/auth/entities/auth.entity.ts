import { Column, DataType, Model, Table } from 'sequelize-typescript';
@Table({
  tableName: 'auth_user',
  timestamps: false,
})
export class AuthUser extends Model {
  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    defaultValue: false,
  })
  password: string;
}
