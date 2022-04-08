import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { AdminUser } from './entities/admin-user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectModel(AdminUser)
    private adminsModel: typeof AdminUser,
    private usersService: UsersService,
  ) {}

  async create(createAdminUserDto: any) {
    const { userId, email } = await createAdminUserDto;
    const userSearch = await this.usersService.findOne(userId);
    if (!userSearch) {
      throw new HttpException(
        'provided user does not exist',
        HttpStatus.NOT_FOUND,
      );
    } else {
      const userExistent = await this.findOneEmail(email);
      if (userExistent) {
        throw new HttpException('existing admin', HttpStatus.CONFLICT);
      } else {
        const admin = await this.adminsModel.create(createAdminUserDto);
        await this.usersService.update(userId, {
          admin: true,
        });
        if (admin) {
          throw new HttpException('admin created successfully', HttpStatus.OK);
        }
      }
    }
  }

  async findAll() {
    const admins = await this.adminsModel.findAll();
    if (admins.length < 1) {
      throw new HttpException('admins not found', HttpStatus.NOT_FOUND);
    }
    return admins;
  }

  async findOne(id: number) {
    const admins = await this.adminsModel.findOne({ where: { id: id } });
    if (!admins) {
      throw new HttpException('admins not found', HttpStatus.NOT_FOUND);
    }
    return admins;
  }

  async findOneEmail(email: string) {
    const admins = await this.adminsModel.findOne({ where: { email: email } });
    if (!admins) {
      return false;
    }
    return admins;
  }

  async update(id: number, updateAdminUserDto: UpdateAdminUserDto) {
    const admin: any = await this.adminsModel.update(updateAdminUserDto, {
      where: {
        id: id,
      },
    });
    if (admin == 0) {
      throw new HttpException('admin not found', HttpStatus.NOT_FOUND);
    } else {
      throw new HttpException('admin updated successfully', HttpStatus.OK);
    }
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    const adminDel = await this.adminsModel.destroy({
      where: {
        id: id,
      },
    });
    await this.usersService.update(admin.userId, {
      admin: false,
    });
    if (adminDel == 0) {
      throw new HttpException('admin not found', HttpStatus.NOT_FOUND);
    } else {
      throw new HttpException('admin successfully deleted', HttpStatus.OK);
    }
  }
}
