/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'Moderator',
  timestamps: false,
})
export class Moderator extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  ModeratorId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  ModeratorName: string;

  @Column({
    type: DataType.STRING(5000),
    allowNull: false,
  })
  ModeratorPassword: string;

  @Column({
    type: DataType.STRING(5000),
    allowNull: false,
    validate: {
      isEmail: true, // ✅ Validates that the value is an email
    },
  })
  ModeratorEmail: string;
}
