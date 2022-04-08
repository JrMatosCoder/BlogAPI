import { Column, Model, Table, HasOne } from 'sequelize-typescript';
import { Article } from '../../articles/entities/article.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { AdminUser } from '../../admin-users/entities/admin-user.entity';

@Table
export class User extends Model {
  @Column
  name: string;
  @Column
  admin: boolean;
  @Column
  email: string;
  @Column
  password: string;

  @HasOne(() => Article)
  article?: Article;

  @HasOne(() => Comment)
  comment?: Comment;

  @HasOne(() => AdminUser)
  adminUser?: AdminUser;
}
