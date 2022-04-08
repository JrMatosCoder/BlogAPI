import { forwardRef, Module } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { AdminUsersController } from './admin-users.controller';
import { UsersModule } from '../users/users.module';
import { AdminUser } from './entities/admin-user.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([AdminUser]),
    forwardRef(() => UsersModule),
  ],
  controllers: [AdminUsersController],
  providers: [AdminUsersService],
  exports: [AdminUsersModule, AdminUsersService],
})
export class AdminUsersModule {}
