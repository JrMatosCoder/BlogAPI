import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAdminAuthGuard } from 'src/Auth/strategies/admin-auth.guard';
import { AdminUsersService } from './admin-users.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';

@Controller('admin-users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @UseGuards(JwtAdminAuthGuard)
  @Post()
  create(@Body() createAdminUserDto: CreateAdminUserDto) {
    return this.adminUsersService.create(createAdminUserDto);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get()
  findAll() {
    return this.adminUsersService.findAll();
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminUsersService.findOne(+id);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminUserDto: UpdateAdminUserDto,
  ) {
    return this.adminUsersService.update(+id, updateAdminUserDto);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminUsersService.remove(+id);
  }
}
