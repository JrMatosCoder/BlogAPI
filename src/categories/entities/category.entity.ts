import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Article } from '../../articles/entities/article.entity';

@Table
export class Category extends Model {
  @Column
  title: string;

  @Column
  slug: string;

  @HasMany(() => Article)
  articles?: Article[];
}
