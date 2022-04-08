import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Article } from '../../articles/entities/article.entity';
import { User } from '../../users/entities/user.entity';

@Table
export class Comment extends Model {
  @Column
  description: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Article)
  @Column
  articleId: number;

  @BelongsTo(() => Article)
  Article: Article;
}
