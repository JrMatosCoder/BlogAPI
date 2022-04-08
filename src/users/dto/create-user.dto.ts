import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;
  @IsOptional()
  admin: boolean;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
