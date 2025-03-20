import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'recipes',
  timestamps: false,
})
export class Recipe extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;
}
