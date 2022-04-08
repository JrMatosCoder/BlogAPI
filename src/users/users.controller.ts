import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../Auth/strategies/jwt-auth.guard';
import { JwtAdminAuthGuard } from '../Auth/strategies/admin-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/id')
  findOne(@Req() req: any) {
    return this.usersService.findOne(req.user.userId);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get(':email')
  findOneEmail(@Param() param: any) {
    return this.usersService.findOneEmail(param.email);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/')
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/')
  remove(@Req() req: any) {
    return this.usersService.remove(req.user.userId);
  }
}
