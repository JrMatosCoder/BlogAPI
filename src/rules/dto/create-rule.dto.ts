import { IsString } from 'class-validator';
export class CreateRuleDto {
  @IsString()
  title: string;
}
