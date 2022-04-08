import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Table
export class Article extends Model {
  @Column
  title: string;

  @Column
  slug: string;

  @Column
  cover: string;

  @Column
  keys: string;

  @Column
  body: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => Comment)
  comments?: Comment[];
}
