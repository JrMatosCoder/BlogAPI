import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AdminUsersModule } from '../admin-users/admin-users.module';
import { PassportModule } from '@nestjs/passport';
import { jwtStrategy } from './strategies/jwt.strategy';
import { jwtAdminStrategy } from './strategies/admin-strategy';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET_ADMIN,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    AdminUsersModule,
    PassportModule,
  ],
  providers: [AuthService, jwtStrategy, jwtAdminStrategy],
  controllers: [LoginController],
  exports: [AuthModuleAdmin],
})
export class AuthModuleAdmin {}
