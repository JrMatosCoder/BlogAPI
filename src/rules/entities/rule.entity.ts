import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Rule extends Model {
  @Column
  title: string;
}
