import { IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  description: string;
  @IsNumber()
  userId: number;
  @IsNumber()
  articleId: number;
}
