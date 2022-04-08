import { IsString, IsNumber } from 'class-validator';

export class CreateAdminUserDto {
  @IsString()
  email: string;
  @IsNumber()
  userId: number;
}
