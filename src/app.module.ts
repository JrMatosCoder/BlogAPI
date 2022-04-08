import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { RulesModule } from './rules/rules.module';
import { CategoriesModule } from './categories/categories.module';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { AuthModuleAdmin } from './Auth/auth.module';
import { AdminUsersModule } from './admin-users/admin-users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'blog',
      autoLoadModels: true,
      synchronize: true,
      models: [],
    }),
    UsersModule,
    RulesModule,
    CategoriesModule,
    ArticlesModule,
    CommentsModule,
    NewsletterModule,
    AuthModuleAdmin,
    AdminUsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
