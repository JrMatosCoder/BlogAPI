import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import slugify from 'slugify';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const ObjModel = await createCategoryDto;
    const slug = await slugify(ObjModel.title);
    const Categories = await this.categoryModel.create({
      title: ObjModel.title,
      slug: slug,
    });
    if (!Categories) {
      throw new HttpException(
        'internal error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    throw new HttpException('category created successfully', HttpStatus.OK);
  }

  async findAll() {
    const Categories = await this.categoryModel.findAll();
    if (Categories.length < 1) {
      throw new HttpException('Categories not found', HttpStatus.NOT_FOUND);
    }
    return Categories;
  }

  async findOne(id: number) {
    const Category = await this.categoryModel.findOne({ where: { id: id } });
    if (!Category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return Category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const ObjModel = await updateCategoryDto;
    const slug = await slugify(ObjModel.title);
    const Category: any = await this.categoryModel.update(
      { title: ObjModel.title, slug: slug },
      {
        where: {
          id: id,
        },
      },
    );
    if (Category == 0) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Category updated successfully', HttpStatus.OK);
  }

  async remove(id: number) {
    const Category = await this.categoryModel.destroy({
      where: {
        id: id,
      },
    });
    if (Category == 0) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Category successfully deleted', HttpStatus.OK);
  }
}
