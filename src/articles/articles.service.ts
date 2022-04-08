import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import slugify from 'slugify';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article)
    private articleModel: typeof Article,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const ObjModel = await createArticleDto;
    const slug = await slugify(ObjModel.title);
    const Article = await this.articleModel.create({
      title: ObjModel.title,
      slug: slug,
      cover: ObjModel.cover,
      keys: ObjModel.keys,
      body: ObjModel.body,
      categoryId: ObjModel.categoryId,
    });
    if (!Article) {
      throw new HttpException(
        'internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    throw new HttpException('article created successfully', HttpStatus.OK);
  }

  async findAll() {
    const Articles = await this.articleModel.findAll();
    if (Articles.length < 1) {
      throw new HttpException('articles not found', HttpStatus.NOT_FOUND);
    }
    return Articles;
  }

  async findOne(id: number) {
    const Article = await this.articleModel.findOne({ where: { id: id } });
    if (!Article) {
      throw new HttpException('article not found', HttpStatus.NOT_FOUND);
    }
    return Article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const ObjModel = await updateArticleDto;
    const slug = await slugify(ObjModel.title);
    const Article: any = await this.articleModel.update(
      {
        title: ObjModel.title,
        slug: slug,
        cover: ObjModel.cover,
        keys: ObjModel.keys,
        body: ObjModel.body,
        category: ObjModel.categoryId,
      },
      {
        where: {
          id: id,
        },
      },
    );
    if (Article == 0) {
      throw new HttpException('article not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('article updated successfully', HttpStatus.OK);
  }

  async remove(id: number) {
    const Article = await this.articleModel.destroy({
      where: {
        id: id,
      },
    });
    if (Article == 0) {
      throw new HttpException('article not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('article successfully deleted', HttpStatus.OK);
  }
}
