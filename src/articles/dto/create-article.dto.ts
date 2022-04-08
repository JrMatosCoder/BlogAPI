import { IsString, IsInt } from 'class-validator';
export class CreateArticleDto {
  @IsString()
  title: string;
  @IsString()
  cover: string;
  @IsString()
  keys: Array<string>;
  @IsString()
  body: string;
  @IsInt()
  categoryId: number;
}
