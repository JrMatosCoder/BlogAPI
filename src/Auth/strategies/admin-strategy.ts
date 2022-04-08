import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class jwtAdminStrategy extends PassportStrategy(Strategy, 'jwtadmin') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_ADMIN,
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(payload.userId);
    if (user.admin) {
      return true;
    } else {
      return false;
    }
  }
}
