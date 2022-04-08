import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { Newsletter } from './entities/newsletter.entity';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectModel(Newsletter)
    private NewSletterModel: typeof Newsletter,
  ) {}
  async create(createNewsletterDto: any) {
    const NewSletter = await this.NewSletterModel.create(createNewsletterDto);
    if (!NewSletter) {
      throw new HttpException(
        'internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    throw new HttpException('NewSletter created successfully', HttpStatus.OK);
  }

  async findAll() {
    const NewSletter = await this.NewSletterModel.findAll();
    if (NewSletter.length < 1) {
      throw new HttpException('NewSletter not found', HttpStatus.NOT_FOUND);
    }
    return NewSletter;
  }

  async findOne(id: number) {
    const NewSletter = await this.NewSletterModel.findOne({
      where: { id: id },
    });
    if (!NewSletter) {
      throw new HttpException('NewSletter not found', HttpStatus.NOT_FOUND);
    }
    return NewSletter;
  }

  async update(id: number, updateNewsletterDto: UpdateNewsletterDto) {
    const NewSletter: any = await this.NewSletterModel.update(
      updateNewsletterDto,
      {
        where: {
          id: id,
        },
      },
    );
    if (NewSletter == 0) {
      throw new HttpException('NewSletter not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('NewSletter updated successfully', HttpStatus.OK);
  }

  async remove(id: number) {
    const NewSletter = await this.NewSletterModel.destroy({
      where: {
        id: id,
      },
    });
    if (NewSletter == 0) {
      throw new HttpException('NewSletter not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('NewSletter successfully deleted', HttpStatus.OK);
  }
}
