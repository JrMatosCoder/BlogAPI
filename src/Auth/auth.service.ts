import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AdminUsersService } from '../admin-users/admin-users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private adminService: AdminUsersService,
    private jwtService: JwtService,
  ) {}

  async Validate(email: string, password: string) {
    const user = await this.usersService.findOneEmail(email);
    const validatePass = await bcrypt.compare(password, user.password);
    if (user && validatePass) {
      return this.login(user);
    }
    throw new HttpException(
      'email ou senha inválidos!',
      HttpStatus.BAD_REQUEST,
    );
  }

  async login(user: any) {
    const payload = { email: user.email, userId: user.id };
    return {
      payload,
      access_token: this.jwtService.sign(payload),
    };
  }
}
