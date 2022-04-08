import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Newsletter extends Model {
  @Column
  email: string;
}
