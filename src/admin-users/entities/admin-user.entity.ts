import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table
export class AdminUser extends Model {
  @Column
  email: string;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
