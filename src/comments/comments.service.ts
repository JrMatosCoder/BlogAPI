import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) {}

  async create(createCommentDto: any) {
    const Comments = await this.commentModel.create(createCommentDto);
    if (!Comments) {
      throw new HttpException(
        'internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    throw new HttpException('comment created successfully', HttpStatus.OK);
  }

  async findAll() {
    const Comments = await this.commentModel.findAll();
    if (Comments.length < 1) {
      throw new HttpException('comments not found', HttpStatus.NOT_FOUND);
    }
    return Comments;
  }

  async findOne(id: number) {
    const Comment = await this.commentModel.findOne({ where: { id: id } });
    if (!Comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
    return Comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const Comment: any = await this.commentModel.update(updateCommentDto, {
      where: { id: id },
    });
    if (Comment == 0) {
      throw new HttpException('comment not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('comment updated successfully', HttpStatus.OK);
  }

  async remove(id: number) {
    const Comment = await this.commentModel.destroy({
      where: {
        id: id,
      },
    });
    if (Comment == 0) {
      throw new HttpException('comment not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('comment successfully deleted', HttpStatus.OK);
  }
}
