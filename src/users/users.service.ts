import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const ObjModel = await createUserDto;
    const saltOrRounds = 10;
    const password = await ObjModel.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const users = await this.userModel.create({
      name: ObjModel.name,
      admin: false,
      email: ObjModel.email,
      password: hash,
    });
    if (!users) {
      throw new HttpException(
        'internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    console.log(users);
    throw new HttpException('user created successfully', HttpStatus.OK);
  }

  async findAll() {
    const users = await this.userModel.findAll();
    if (users.length < 1) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({ where: { id: id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findOneEmail(email: string) {
    const user = await this.userModel.findOne({ where: { email: email } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user: any = await this.userModel.update(updateUserDto, {
      where: {
        id: id,
      },
    });
    if (user == 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      throw new HttpException('User updated successfully', HttpStatus.OK);
    }
  }

  async remove(id: number) {
    const user = await this.userModel.destroy({
      where: {
        id: id,
      },
    });
    if (user == 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('user successfully deleted', HttpStatus.OK);
  }
}
